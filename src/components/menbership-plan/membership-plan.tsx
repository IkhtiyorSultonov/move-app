import React, { useState } from "react";

import { MembershipPlanProps } from "./membership-plan.props";
import moment from "moment";
import { useAuth } from "src/hooks/useAuth";

const membershipplan = ({ subscription }: MembershipPlanProps) => {
  const [isloading, setisloading] = useState(false);
  const { user } = useAuth();
  console.log(subscription);

  const openPortal = async () => {
    setisloading(true);
    const payload = { user_id: subscription.customer.metadata.user_id };
    const response = await fetch("api/subscraption/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    setisloading(false);
    window.open(data.portal);
  };
  return (
    <div className="mt-6 grid border grid-cols-1 gap-x-4 px-4 py-4 md:grid-cols-4 md:border-x  md:border-t md:border-b-0 md:pb-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">Membrship & Billing</h4>
        <button
          onClick={openPortal}
          className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
        >
          {isloading ? "Loading..." : "  Cancel Membership"}
        </button>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row ">
          <div>
            <p className="font-medium">{subscription.customer.email}</p>
            <p className="text-[gray]">psswor:******</p>
          </div>
          <div className="md:text-right">
            <p onClick={openPortal} className={"MembershipLink"}>
              {" "}
              {isloading ? "Loading..." : "Change Email"}
            </p>
            <p onClick={openPortal} className={"MembershipLink"}>
              {" "}
              {isloading ? "Loading..." : "Change Password"}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-4 md:flex-row md:pb-0">
          <div>
            <div className="flex flex-col gap-2 items-center">
              <p>
                <span className="p-2 px-1  uppercase rounded bg-white/20">
                  {subscription.default_payment_method
                    ? subscription.default_payment_method.card.brand
                    : subscription.customer.invoice_settings
                        .default_payment_method.card.brand}
                </span>
                **** **** ****{" "}
                {subscription.default_payment_method
                  ? subscription.default_payment_method.card.last4
                  : subscription.customer.invoice_settings
                      .default_payment_method.card.last4}
              </p>
              <p className="mt-4 text-white">
                Your next billin day
                {moment(subscription.current_period_end * 1000).format(
                  "DD MMM, yyyy"
                )}
              </p>
            </div>
          </div>
          <div className="md:text-right">
            {isloading ? (
              "Loading..."
            ) : (
              <>
                <p onClick={openPortal} className="MembershipLink">
                  Mange Payment Info
                </p>
                <p onClick={openPortal} className="MembershipLink">
                  Add backup payment mrthod
                </p>
                <p onClick={openPortal} className="MembershipLink">
                  Billing detail
                </p>
                <p onClick={openPortal} className="MembershipLink">
                  Change billin day
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default membershipplan;
