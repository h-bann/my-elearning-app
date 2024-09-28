import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketCount, selectBasketItems } from "../../redux/basketSlice";

const Basket = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector(selectBasketItems);
  const basketCount = useSelector(selectBasketCount);

  return (
    <div>
      <h3>Basket</h3>
      <p>Number of items in basket: {basketCount}</p>
      {!basketItems.length && <p>There are no items in your basket</p>}

      <table>
        <th>Item </th>
        {basketItems.map((item) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.course_title}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Basket;
