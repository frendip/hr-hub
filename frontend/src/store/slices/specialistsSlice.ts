import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ISpecialist} from '../../types/ISpecialist';
import SpecialistsService from '../../API/SpecialistsService';

export const fetchSpecialists = createAsyncThunk<ISpecialist[]>(
    'products/fetchProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await SpecialistsService.getSpecialists();
            const data = response.specialists as ISpecialist[];
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface specialistsState {
    specialists: ISpecialist[];
    errorMessage: string;
    status: Status;
}

const initialState: specialistsState = {
    specialists: [],
    errorMessage: '',
    status: Status.LOADING
};

const productsSlice = createSlice({
    name: 'specialists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialists.fulfilled, (state, action) => {
                state.specialists = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchSpecialists.pending, (state) => {
                state.status = Status.LOADING;
                state.specialists = [];
            })
            .addCase(fetchSpecialists.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.specialists = [];
            });
    }
});

export default productsSlice.reducer;
