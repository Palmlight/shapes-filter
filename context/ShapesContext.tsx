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

const filterShapesData = (colorArray: string[], shapeArray: string[]) => {
  return SHAPESDATA.filter(
    sh => colorArray?.includes(sh.color) && shapeArray?.includes(sh.shape)
  );
};

const updateTitleFunction = (colorArray: string[], shapeArray: string[]) => {
  if (colorArray?.length === 1 && shapeArray?.length === 1) {
    return `${shapeArray[0]} ${colorArray[0]} items`;
  } else if (
    shapeArray?.length === 1 &&
    colorArray?.length > 1 &&
    colorArray?.length !== colors.length
  ) {
    return `Multiple ${shapeArray[0]} items `;
  } else if (
    colorArray?.length === 1 &&
    shapeArray?.length > 1 &&
    shapeArray?.length !== shapes.length
  ) {
    return `Multiple ${colorArray[0]} items `;
  } else if (colorArray?.length === 1 && shapeArray?.length === shapes.length) {
    return `All ${colorArray[0]} items `;
  } else if (shapeArray?.length === 1 && colorArray?.length === colors.length) {
    return `All ${shapeArray[0]} items `;
  } else if (
    colorArray.length === colors.length &&
    shapeArray.length === colors.length
  ) {
    return "All items";
  } else {
    return "Multiple items";
  }
};

const ShapesAndColorReducer = (
  state: IShapesDefaultState,
  action: IShapeActions
) => {
  switch (action.type) {
    case IShapeContextActionTypes.TOGGLE_COLORS:
      if (state.selectedColors.includes(action.payload)) {
        if (state.selectedColors?.length === 1) {
          return {
            ...state,
            selectedColors: colors,
            shapesData: filterShapesData(colors, state.selectedShapes),
            title: updateTitleFunction(colors, state.selectedShapes)
          };
        }
        const newColorArray = state.selectedColors?.filter(
          color => color !== action.payload
        );
        return {
          ...state,
          selectedColors: newColorArray,
          shapesData: filterShapesData(newColorArray, state.selectedShapes),
          title: updateTitleFunction(newColorArray, state.selectedShapes)
        };
      } else {
        const newColorArray = [...state.selectedColors, action.payload];
        return {
          ...state,
          selectedColors: newColorArray,
          shapesData: filterShapesData(newColorArray, state.selectedShapes),
          title: updateTitleFunction(newColorArray, state.selectedShapes)
        };
      }

    case IShapeContextActionTypes.TOGGLE_SHAPES:
      if (state.selectedShapes.includes(action.payload)) {
        if (state.selectedShapes?.length === 1) {
          return {
            ...state,
            selectedShapes: shapes,
            shapesData: filterShapesData(colors, shapes),
            title: updateTitleFunction(colors, shapes)
          };
        }
        const newShapeArray = state.selectedShapes?.filter(
          shape => shape !== action.payload
        );
        return {
          ...state,
          selectedShapes: newShapeArray,
          shapesData: filterShapesData(state.selectedColors, newShapeArray),
          title: updateTitleFunction(state.selectedColors, newShapeArray)
        };
      } else {
        const newShapeArray = [...state.selectedShapes, action.payload];
        return {
          ...state,
          selectedShapes: newShapeArray,
          shapesData: filterShapesData(state.selectedColors, newShapeArray),
          title: updateTitleFunction(state.selectedColors, newShapeArray)
        };
      }

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
