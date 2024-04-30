// UsdAccountFundDebits.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getUserUsdAccountFundDebits } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import {formatAmount} from "../FormatAmount";

function UsdAccountFundDebits() {
  const dispatch = useDispatch(); 

  const getUserUsdAccountFundDebitsState = useSelector(
    (state) => state.getUserUsdAccountFundDebitsState
  );
  const { loading, accountFunds, error } = getUserUsdAccountFundDebitsState;
  console.log("AccountFundDebits:", accountFunds);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo.access:", userInfo.access);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accountFunds?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getUserUsdAccountFundDebits());
  }, [dispatch]);

  return (
    <div>
      <hr />
      <h1 className="text-center py-3">
        <i className="fas fa-credit-card"></i> Account Fund Debits (USD)
      </h1>
      <hr />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">
             USD Account Fund Debits appear here.
            </div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Debit Fund ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Old Balance</th> 
                  <th>New Balance</th> 
                  <th>Payment Method</th>
                  {/* <th>Currency</th> */}
                  <th>Success</th>
                  {/* <th>Payment Provider</th> */}
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((accountFund, index) => (
                  <tr key={accountFund.id}>
                    <td>{index + 1}</td>
                    <td>{accountFund.debit_account_id}</td>
                    <td>
                      <td>{accountFund.user_email}</td>
                    </td>
                    <td style={{color: "red" }} >{formatAmount(accountFund.amount)} {accountFund.currency}</td> 
                    <td>{formatAmount(accountFund.old_bal)}</td>
                    <td>{formatAmount(accountFund.new_bal)}</td>
                    <td>{accountFund.payment_method}</td>
                    {/* <td>{accountFund.currency}</td> */}
                    <td>
                      {accountFund.is_success ? (
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: "16px", color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times-circle"
                          style={{ fontSize: "16px", color: "red" }}
                        ></i>
                      )}
                    </td>
                    {/* <td>{accountFund.payment_provider}</td> */}
                    <td>
                      {new Date(accountFund.timestamp).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={accountFunds.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </> 
      )}
    </div>
  );
}

export default UsdAccountFundDebits;
