import { createSlice } from '@reduxjs/toolkit';
import { showAlert } from '../../components'
import {
  clearDataFields,
  defaltValueSetup,
  selectedTypeUpdate,
  lookupByAssetNumberAction,
  getUDFDataAction,
  udfSelectedAction,
  removeSelectedUDFAction,
  udfFieldLookup,
  clearAllUDFSelected,
  updateRelocateForm,
} from '../actions';
const entity = {
  unitCost: '',
  productCategory: '',
  assetNumber: '',
  assetID: '',
  descriptionCatalogData: {
    description: '',
    manufacturer: '',
    productImageURI: '',
    productNumber: '',
    userCode: null,
  },
  descriptionID: '',
  location: '',
  selectedConditionCode: '',
  UDFList: [],
  defaultValues: {
    location: false,
    selectedConditionCode: false,
  },
  UDFLookupList: [],
  conditionCodeList: [],
  selectedUDFs: [],
  udfTypes: [],
  permissions: [],
  securityLevel: 'FULL ACCESS',
  defaultLocation: ''
  // securityLevel: "READ ONLY"
};

export const dataTab = createSlice({
  name: 'data',
  initialState: { entity: entity, loading: false, errorMsg: undefined },
  reducers: {},
  extraReducers: {
    [lookupByAssetNumberAction.pending]: (state) => {
      state.loading = true;
      state.errorMsg = undefined;
    },
    [lookupByAssetNumberAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const { defaultValues, permissions, securityLevel } = state.entity;
      if (payload.data) {
        state.errorMsg = payload.data;
      } else {
        const { location, selectedConditionCode } = defaultValues;
        state.errorMsg = undefined;
        if (location) {
          delete payload.location;
        }

        if (selectedConditionCode) {
          delete payload.selectedConditionCode;
        }
        const accessIndex = permissions.findIndex(
          (i) => i.dataCategory === payload.DataCategory,
        );
        // console.log(permissions,"====PEr==",permissions[accessIndex] ? permissions[accessIndex] : undefined)
        if (
          permissions[accessIndex] &&
          permissions[accessIndex].securityLevel == 'NO ACCESS'
        ) {
          state.entity = {
            ...state.entity,
            securityLevel:
              accessIndex > -1 && permissions[accessIndex]
                ? permissions[accessIndex].securityLevel
                : securityLevel,
          };
        } else {
          state.entity = {
            ...state.entity,
            ...payload,
            securityLevel:
              accessIndex > -1 && permissions[accessIndex]
                ? permissions[accessIndex].securityLevel
                : securityLevel,
          };
        }
      }
    },
    [lookupByAssetNumberAction.rejected]: (state, error) => {
      state.loading = false;
    },

    [selectedTypeUpdate.pending]: (state) => {
      state.loading = true;
      state.errorMsg = undefined;
    },

    [selectedTypeUpdate.fulfilled]: (state, { payload }) => {
      const { type, title } = payload;
      state.loading = false;

      state.entity = {
        ...state.entity,
        [type]: title,
      };
    },
    [selectedTypeUpdate.rejected]: (state, error) => {
      state.loading = false;
    },

    [clearDataFields.fulfilled]: (state, { payload }) => {
      state.entity = {
        ...entity,
        defaultValues: state.entity.defaultValues,
        UDFLookupList: state.entity.UDFLookupList,
        conditionCodeList: state.entity.conditionCodeList,
        udfTypes: state.entity.udfTypes,

        location:
          state.entity.defaultValues.location == true
            ? state.entity.location
            : '',
        selectedConditionCode:
          state.entity.defaultValues.selectedConditionCode == true
            ? state.entity.selectedConditionCode
            : '',
        selectedUDFs: state.entity.selectedUDFs.map((i) => ({
          key: i.key,
          label: i.label,
          fieldType: i.fieldType,
          verifyData: i.verifyData,
        })),
        permissions: state.entity.permissions.map((i) => i),
      };
    },

    [defaltValueSetup.fulfilled]: (state, { payload }) => {
      const { name, status } = payload;
      state.entity.defaultValues = {
        ...state.entity.defaultValues,
        [name]: status,
      };
    },

    [udfFieldLookup.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entity.selectedUDFs = payload;
    },

    [getUDFDataAction.pending]: (state) => {
      state.loading = true;
      state.errorMsg = undefined;
    },

    [getUDFDataAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.errorMsg = undefined;
      // state.entity.selectedUDFs = payload.selectedUDFs
      //   ? payload.selectedUDFs
      //   : [];
      state.entity.selectedUDFs =
        state.entity.selectedUDFs && state.entity.selectedUDFs.length > 0
          ? state.entity.selectedUDFs
          : payload.selectedUDFs
            ? payload.selectedUDFs
            : [];
      state.entity.UDFLookupList = payload.userDefinedFields
        ? payload.userDefinedFields
        : [];

      state.entity.selectedUDFs.filter((e) => {
        if (e.fieldType == 'CURRENCY' && e.value) {
          e.value = parseFloat(e.value).toFixed(2);
        }
      })

      // console.log("-----state.entity.selectedUDFs---",state.entity.selectedUDFs)
      state.entity.udfTypes = payload.udfTypes;
      state.entity.conditionCodeList = payload.conditionCode;
      state.entity.permissions = payload.permissions;
    },

    [getUDFDataAction.rejected]: (state, error) => {
      state.loading = false;
    },

    [udfSelectedAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const filterValue = state.entity.UDFList.filter(
        (i) => i.UDFFieldName == payload.label,
      );
      const obj = {
        ...payload,
        value: filterValue && filterValue[0] ? filterValue[0].UDFFieldData : '',
      };
      // state.entity.selectedUDFs.forEach(function (obj) {
      //   if (obj.fieldType == "CURRENCY" && obj.value != undefined && obj.value != "") {
      //     let udfValue = parseFloat(obj.value);
      //     obj.value = udfValue.toFixed(2);
      //   }
      // });

      state.entity.selectedUDFs = [...state.entity.selectedUDFs, obj];
      state.entity.selectedUDFs.sort((a, b) => {
        let fa = a.label,
          fb = b.label;
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    },

    [removeSelectedUDFAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      let updatedList = state.entity.selectedUDFs.filter(
        (item) => item.key != payload.key,
      );
      state.entity.selectedUDFs = updatedList;
    },

    [clearAllUDFSelected.fulfilled]: (state, { payload }) => {
      state.entity.selectedUDFs = [];
    },

    [updateRelocateForm.pending]: (state, { payload }) => {
      state.loading = true;
    },

    [updateRelocateForm.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
  },
}).reducer;
