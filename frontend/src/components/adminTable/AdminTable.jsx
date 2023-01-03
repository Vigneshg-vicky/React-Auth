import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAdminGetUserDataQuery } from "../../redux/Features/api/apiSlice";
import AddUserModal from "../Modals/addUserModal";
import EditUserModal from "../Modals/editUserModal";
import DeleteUserModal from "../Modals/UserDeleteModal";
import { useState } from "react";
function AdminTable() {
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useAdminGetUserDataQuery();
  let users = [];
  if (isSuccess) {
    users = data.users;
  }
  const [userDetails, setuserDetails] = useState({});
  return (
    <>
      <AddUserModal />

      <Table style={{ fontSize: "30px" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <div>
                      <EditUserModal
                        key={index}
                        name={data.name}
                        email={data.email}
                        Id={data._id}
                      />
                      {/* <button className="btn btn-primary">Edit</button> */}
                    </div>
                    &nbsp; &nbsp;
                    <div>
                      <DeleteUserModal key={index} userId={data._id} name={data.name}/>
                      {/* <button className="btn btn-danger">Delete</button> */}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default AdminTable;
