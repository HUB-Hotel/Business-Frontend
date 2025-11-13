import { createContext, useContext, useReducer } from 'react'
import api from '../utils/api'

const HotelContext = createContext()

const initialState = {
  hotels: [],
  currentHotel: null,
  loading: false,
  error: null,
}

const hotelReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_HOTELS':
      return {
        ...state,
        hotels: action.payload,
        loading: false,
        error: null,
      }
    case 'SET_CURRENT_HOTEL':
      return {
        ...state,
        currentHotel: action.payload,
        loading: false,
        error: null,
      }
    case 'ADD_HOTEL':
      return {
        ...state,
        hotels: [action.payload, ...state.hotels],
        loading: false,
        error: null,
      }
    case 'UPDATE_HOTEL':
      return {
        ...state,
        hotels: state.hotels.map((hotel) =>
          hotel._id === action.payload._id ? action.payload : hotel
        ),
        currentHotel:
          state.currentHotel?._id === action.payload._id
            ? action.payload
            : state.currentHotel,
        loading: false,
        error: null,
      }
    case 'DELETE_HOTEL':
      return {
        ...state,
        hotels: state.hotels.filter((hotel) => hotel._id !== action.payload),
        currentHotel:
          state.currentHotel?._id === action.payload ? null : state.currentHotel,
        loading: false,
        error: null,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const HotelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hotelReducer, initialState)

  // Get all hotels for business owner
  const getHotels = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.get('/hotels')
      dispatch({ type: 'SET_HOTELS', payload: response.data.data })
      return { success: true, data: response.data.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch hotels'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  // Get single hotel
  const getHotel = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.get(`/hotels/${id}`)
      dispatch({ type: 'SET_CURRENT_HOTEL', payload: response.data.data })
      return { success: true, data: response.data.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch hotel'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  // Create hotel
  const createHotel = async (hotelData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.post('/hotels', hotelData)
      dispatch({ type: 'ADD_HOTEL', payload: response.data.data })
      return { success: true, data: response.data.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create hotel'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  // Update hotel
  const updateHotel = async (id, hotelData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await api.put(`/hotels/${id}`, hotelData)
      dispatch({ type: 'UPDATE_HOTEL', payload: response.data.data })
      return { success: true, data: response.data.data }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update hotel'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  // Delete hotel
  const deleteHotel = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await api.delete(`/hotels/${id}`)
      dispatch({ type: 'DELETE_HOTEL', payload: id })
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete hotel'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  // Clear current hotel
  const clearCurrentHotel = () => {
    dispatch({ type: 'SET_CURRENT_HOTEL', payload: null })
  }

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value = {
    hotels: state.hotels,
    currentHotel: state.currentHotel,
    loading: state.loading,
    error: state.error,
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    clearCurrentHotel,
    clearError,
  }

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
}

export const useHotel = () => {
  const context = useContext(HotelContext)
  if (!context) {
    throw new Error('useHotel must be used within HotelProvider')
  }
  return context
}
