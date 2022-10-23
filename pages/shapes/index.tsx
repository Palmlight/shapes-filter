import { GetServerSideProps } from "next";
import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import {
  IShapeContextActionTypes,
  ShapesContext
} from "../../context/ShapesContext";
import { colors, shapes } from "../../utils/constants";

const ShapesIndex = () => {
  const { state, dispatch } = useContext(ShapesContext);

  console.log(state.shapesData);

  return (
    <Layout>
      <>
        <h3>Filter</h3>

        <div className="">
          <h5 className="filter-title">Shapes</h5>

          <div className="shapes-filter-wrapper">
            {shapes?.map(shape => (
              <div
                className={`shapes-filter-btn ${
                  state.selectedShapes?.includes(shape) ? "selected" : ""
                }`}
                key={shape}
                onClick={() =>
                  dispatch?.({
                    type: IShapeContextActionTypes?.TOGGLE_SHAPES,
                    payload: shape
                  })
                }
              >
                {shape}
              </div>
            ))}
          </div>

          <h5 className="filter-title">Colors</h5>

          <div className="shapes-filter-wrapper">
            {colors?.map(color => (
              <div
                className={`colors-filter-btn ${color} ${
                  state.selectedColors?.includes(color) ? "selected" : ""
                }`}
                key={color}
                onClick={() =>
                  dispatch?.({
                    type: IShapeContextActionTypes?.TOGGLE_COLORS,
                    payload: color
                  })
                }
              />
            ))}
          </div>

          <div className="grid-titles-row">
            <h1 className="grid-title">{state.title}</h1>

            <p>({state?.shapesData?.length})</p>
          </div>

          <div className="shapes-grid-container">
            {state.shapesData?.map((dt, i) => (
              <div className="shapes-grid-item" key={i}>
                <div className="inner-shape">{dt.color}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
};

// export const getServerSideProps: GetServerSideProps = async context => {
//   console.log(SHAPESDATA);
//   return {
//     props: {
//       data: SHAPESDATA
//     }
//   };
// };

export default ShapesIndex;
