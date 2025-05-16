import React from "react";
import CustomSelect from "../CustomSelect";
import SearchSelect from "../SearchSelect";
import { Pagination } from "antd";

const Settings = () => {
  return (
    <div className="dashboard">
      <div className="tabPadding mb-30">
        <div className="fs-24 fw-600">Settings</div>
        <div className="divider2"></div>
        <div className="inputGrid gap-24">
          <div>
            <label className=" mb-10 fs-14 fw-500">Environment</label>
            <CustomSelect options={["Development", "Development 2"]} />
          </div>
          <div>
            <label className=" mb-10 fs-14 fw-500">Application Type</label>
            <CustomSelect options={["Customer", "Customer 2"]} />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="inputGrid gap-24">
          <div className="d-flex gap-24 flexColumn">
            <div className="d-flex align-center justify-between gap-10">
              <label className=" mb-10 fs-14 fw-500 w-100">iOS Version</label>
              <input type="number" name="" id="" />
            </div>
            <div className="d-flex align-center justify-between gap-10">
              <label className=" mb-10 fs-14 fw-500 w-100">Build Version</label>
              <input type="number" name="" id="" />
            </div>
            <div className="d-flex align-center justify-between gap-10">
              <label className=" mb-10 fs-14 fw-500 w-100">
                Min Force Version
              </label>
              <input type="number" name="" id="" />
            </div>
          </div>
          <div>
            <div className="d-flex gap-24 flexColumn">
              <div className="d-flex align-center justify-between gap-10">
                <label className=" mb-10 fs-14 fw-500 w-100">
                  Android Version
                </label>
                <input type="number" name="" id="" />
              </div>
              <div className="d-flex align-center justify-between gap-10">
                <label className=" mb-10 fs-14 fw-500 w-100">
                  Build Version
                </label>
                <input type="number" name="" id="" />
              </div>
              <div className="d-flex align-center justify-between gap-10">
                <label className=" mb-10 fs-14 fw-500 w-100">
                  Min Force Version
                </label>
                <input type="number" name="" id="" />
              </div>
            </div>
          </div>
        </div>
        <div className="divider2"></div>
        <div className="mb-20">
          <label className=" mb-10 fs-14 fw-500 w-100">Message</label>
          <textarea rows={5} placeholder="Enter your message"></textarea>
        </div>
        <div className="d-flex justify-end">
          <div className="btn p32">Submit</div>
        </div>
      </div>
      <div className="tabPadding">
        <SearchSelect />
        <div className="divider2"></div>
        <div className="overflowy bordertable mb-20">
          <table className="table w-100">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Application Name</th>
                <th>Message</th>
                <th>iOS</th>
                <th>Android</th>
                <th>Min Force Version iOS</th>
                <th>Min Force Version Android</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Customer</td>
                <td>New build Update</td>
                <td>1.2</td>
                <td>1.8</td>
                <td>1.7</td>
                <td>1.7</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Customer</td>
                <td>New build Update</td>
                <td>1.2</td>
                <td>1.8</td>
                <td>1.7</td>
                <td>1.7</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Customer</td>
                <td>New build Update</td>
                <td>1.2</td>
                <td>1.8</td>
                <td>1.7</td>
                <td>1.7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex align-center gap-10 justify-between flexmd">
          <div className="fs-16">Showing 1 to 5 of 10 Restaurants</div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
