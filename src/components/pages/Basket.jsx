import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectBasketCount,
  selectBasketItems,
  setDeleteBasketItem,
  setEmptyBasket,
} from "../../redux/basketSlice";
import { Bin } from "../../utils/svgs";
import Button from "../genericComponents/Button";
import axios from "axios";
import { url } from "../../config";
import { getFromLocal } from "../../storage";
import toast, { Toaster } from "react-hot-toast";

const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basketItems = useSelector(selectBasketItems);
  const basketCount = useSelector(selectBasketCount);

  const deleteBasketItem = (item) => {
    dispatch(setDeleteBasketItem(item.id));
  };

  const onCheckoutClick = () => {
    navigate("/checkout");

    // basketItems.forEach(async (item) => {
    //   try {
    //     const { data: enrolledCourse } = await axios.patch(
    //       `${url}/courses/enrolled`,
    //       {
    //         course_title: item.course_title,
    //         course_id: item.id,
    //         image: item.image,
    //       },
    //       {
    //         headers: { token: getFromLocal("token") },
    //       }
    //     );
    //     console.log(enrolledCourse);
    //     if (enrolledCourse.code === 0) {
    //       toast.error(`Already enrolled on ${item.course_title}`);
    //     }
    //     if (enrolledCourse.code === 1) {
    //       toast.success(`Enrolled onto ${item.course_title}`);
    //       dispatch(setDeleteBasketItem(item.id));
    //       // navigate("/my-learning");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
  };

  return (
    <div>
      <h3>Basket</h3>
      <p>Number of items in basket: {basketCount}</p>
      {!basketItems.length && <p>There are no items in your basket</p>}
      {basketItems.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Item</th>
            </tr>
          </thead>

          <tbody>
            {basketItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.course_title}</td>
                  <td>
                    <Bin onClick={() => deleteBasketItem(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Button
        className={["btn btn-primary"]}
        text="Checkout"
        onClick={() => onCheckoutClick()}
      />
      <Toaster />
    </div>
  );
};

export default Basket;
