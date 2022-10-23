import { createContext, Dispatch, ReactElement, useReducer } from "react";
import { colors, shapes } from "../utils/constants";
import SHAPESDATA from "../utils/shapes.json";

interface IShapesData {
  color: string;
  shape: string;
}

interface IShapesDefaultState {
  title: string;
  selectedColors: string[];
  selectedShapes: string[];
  shapesData: IShapesData[];
}

const initialState: IShapesDefaultState = {
  title: "All items",
  selectedColors: colors,
  selectedShapes: shapes,
  shapesData: SHAPESDATA
};

interface IShapeContextProvider {
  children: ReactElement;
}

export enum IShapeContextActionTypes {
  TOGGLE_COLORS = "toggle_colors",
  TOGGLE_SHAPES = "toggle_shapes"
}

interface IShapeActions {
  type: IShapeContextActionTypes;
  payload: string;
}

export const ShapesContext = createContext<{
  state: IShapesDefaultState;
  dispatch?: Dispatch<IShapeActions>;
}>({
  state: initialState
});

const ShapesAndColorReducer = (
  state: IShapesDefaultState,
  action: IShapeActions
) => {
  switch (action.type) {
    case IShapeContextActionTypes.TOGGLE_COLORS:
      if (state.selectedColors.includes(action.payload)) {
        if (state.selectedColors?.length === 1) {
          return { ...state, selectedColors: colors };
        }
        return {
          ...state,
          selectedColors: state.selectedColors?.filter(
            color => color !== action.payload
          )
        };
      }
      return {
        ...state,
        selectedColors: [...state.selectedColors, action.payload]
      };
    case IShapeContextActionTypes.TOGGLE_SHAPES:
      if (state.selectedShapes.includes(action.payload)) {
        if (state.selectedShapes?.length === 1) {
          return { ...state, selectedShapes: shapes };
        }
        return {
          ...state,
          selectedShapes: state.selectedShapes?.filter(
            shape => shape !== action.payload
          )
        };
      }
      return {
        ...state,
        selectedShapes: [...state.selectedShapes, action.payload]
      };
    default:
      return { ...state };
  }
};

export const ShapeContextProvider = ({ children }: IShapeContextProvider) => {
  const [state, dispatch] = useReducer(ShapesAndColorReducer, initialState);

  const value = { state, dispatch };

  return (
    <ShapesContext.Provider value={value}>{children}</ShapesContext.Provider>
  );
};
