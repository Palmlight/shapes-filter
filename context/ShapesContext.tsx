import { createContext, Dispatch, ReactElement, useReducer } from "react";
import { colors, shapes } from "../utils/constants";

interface IShapesDefaultState {
  title: string;
  selectedColors: string[];
  selectedShapes: string[];
}

const initialState: IShapesDefaultState = {
  title: "All items",
  selectedColors: colors,
  selectedShapes: shapes
};

interface IShapeContextProvider {
  children: ReactElement;
}

enum IShapeContextActionTypes {
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
      return { ...state };
    case IShapeContextActionTypes.TOGGLE_SHAPES:
      return { ...state };
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
