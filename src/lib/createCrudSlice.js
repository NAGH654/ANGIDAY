// src/redux/utils/createCrudSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { toFormData } from "./toFormData";

/**
 * Tạo slice CRUD nhanh cho 1 resource REST:
 * endpoints mặc định:
 *  - GET    /baseUrl            (list)            => params: { ... }
 *  - GET    /baseUrl/:id        (detail)
 *  - POST   /baseUrl            (create)
 *  - PUT    /baseUrl/:id        (replace/update)
 *  - PATCH  /baseUrl/:id        (partial update)
 *  - DELETE /baseUrl/:id        (delete)
 *
 * Hỗ trợ JSON & multipart/form-data cho create/update/patch.
 */
export function createCrudSlice({ name, baseUrl, idField = "id" }) {
  // ---------- Thunks ----------
  const fetchList = createAsyncThunk(`${name}/fetchList`, async (params, { rejectWithValue }) => {
    try {
      const res = await api.get(baseUrl, { params });
      return res.data ?? res; // tuỳ backend
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const fetchById = createAsyncThunk(`${name}/fetchById`, async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${baseUrl}/${id}`);
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const createJson = createAsyncThunk(`${name}/createJson`, async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(baseUrl, data);
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const updateJson = createAsyncThunk(`${name}/updateJson`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${baseUrl}/${id}`, data);
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const patchJson = createAsyncThunk(`${name}/patchJson`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${baseUrl}/${id}`, data);
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const deleteById = createAsyncThunk(`${name}/deleteById`, async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`${baseUrl}/${id}`);
      return (res.data ?? res) || { [idField]: id };
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  // ----- multipart/form-data -----
  const createForm = createAsyncThunk(`${name}/createForm`, async (data, { rejectWithValue }) => {
    try {
      const fd = data instanceof FormData ? data : toFormData(data || {});
      const res = await api.post(baseUrl, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const updateForm = createAsyncThunk(`${name}/updateForm`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const fd = data instanceof FormData ? data : toFormData(data || {});
      const res = await api.put(`${baseUrl}/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  const patchForm = createAsyncThunk(`${name}/patchForm`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const fd = data instanceof FormData ? data : toFormData(data || {});
      const res = await api.patch(`${baseUrl}/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data ?? res;
    } catch (e) {
      return rejectWithValue(extractErr(e));
    }
  });

  // ---------- State ----------
  const initialState = {
    byId: {},
    ids: [],
    listLoading: false,
    detailLoading: false,
    saving: false,
    deleting: false,
    error: null,
    lastQuery: null, // lưu params list
  };

  // ---------- Slice ----------
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearError(state) {
        state.error = null;
      },
      resetState() {
        return { ...initialState };
      },
      // optional: merge/update local
      upsertOne(state, { payload }) {
        const item = payload || {};
        const id = item[idField];
        if (id == null) return;
        state.byId[id] = item;
        if (!state.ids.includes(id)) state.ids.push(id);
      },
      removeOne(state, { payload: id }) {
        delete state.byId[id];
        state.ids = state.ids.filter((x) => x !== id);
      },
    },
    extraReducers: (builder) => {
      // List
      builder.addCase(fetchList.pending, (s, a) => {
        s.listLoading = true;
        s.error = null;
        s.lastQuery = a.meta.arg || null;
      });
      builder.addCase(fetchList.fulfilled, (s, { payload }) => {
        s.listLoading = false;
        const items = normList(payload);
        s.byId = {};
        s.ids = [];
        items.forEach((it) => {
          const id = it[idField];
          if (id == null) return;
          s.byId[id] = it;
          s.ids.push(id);
        });
      });
      builder.addCase(fetchList.rejected, (s, { payload }) => {
        s.listLoading = false;
        s.error = payload || "Fetch list failed";
      });

      // Detail
      builder.addCase(fetchById.pending, (s) => {
        s.detailLoading = true;
        s.error = null;
      });
      builder.addCase(fetchById.fulfilled, (s, { payload }) => {
        s.detailLoading = false;
        const it = normItem(payload);
        const id = it?.[idField];
        if (id != null) {
          s.byId[id] = it;
          if (!s.ids.includes(id)) s.ids.push(id);
        }
      });
      builder.addCase(fetchById.rejected, (s, { payload }) => {
        s.detailLoading = false;
        s.error = payload || "Fetch detail failed";
      });

      // Create/Update/Patch
      [createJson, updateJson, patchJson, createForm, updateForm, patchForm].forEach((th) => {
        builder.addCase(th.pending, (s) => { s.saving = true; s.error = null; });
        builder.addCase(th.fulfilled, (s, { payload }) => {
          s.saving = false;
          const it = normItem(payload);
          const id = it?.[idField];
          if (id != null) {
            s.byId[id] = { ...(s.byId[id] || {}), ...it };
            if (!s.ids.includes(id)) s.ids.push(id);
          }
        });
        builder.addCase(th.rejected, (s, { payload }) => {
          s.saving = false;
          s.error = payload || "Save failed";
        });
      });

      // Delete
      builder.addCase(deleteById.pending, (s) => { s.deleting = true; s.error = null; });
      builder.addCase(deleteById.fulfilled, (s, { meta }) => {
        s.deleting = false;
        const id = meta.arg;
        delete s.byId[id];
        s.ids = s.ids.filter((x) => x !== id);
      });
      builder.addCase(deleteById.rejected, (s, { payload }) => {
        s.deleting = false;
        s.error = payload || "Delete failed";
      });
    },
  });

  // ---------- Selectors ----------
  const selectState = (root) => root[name];
  const selectIds = (root) => selectState(root).ids;
  const selectById = (root, id) => selectState(root).byId[id];
  const selectAll = (root) => selectIds(root).map((id) => selectById(root, id));
  const selectLoading = (root) => {
    const s = selectState(root);
    return s.listLoading || s.detailLoading || s.saving || s.deleting;
  };

  return {
    reducer: slice.reducer,
    actions: { ...slice.actions },
    thunks: {
      fetchList, fetchById,
      createJson, updateJson, patchJson, deleteById,
      createForm, updateForm, patchForm,
    },
    selectors: { selectState, selectIds, selectById, selectAll, selectLoading },
  };
}

// --------- helpers chuẩn hoá & lỗi ----------
function normList(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}
function normItem(payload) {
  if (!payload) return payload;
  if (payload.data && typeof payload.data === "object") return payload.data;
  return payload;
}
function extractErr(e) {
  return e?.response?.data?.message || e?.response?.data || e?.message || "Error";
}
