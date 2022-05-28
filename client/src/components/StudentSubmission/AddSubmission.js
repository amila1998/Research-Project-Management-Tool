import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const AddSubmission = () => {
    const {dispatch, user } = useContext(AuthContext);
    console.log("add submit "+user.username)

  return (
    <div>
        {/* AddSubmission component */}
        
          <form>
              <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Student Name</label>
                  <input type="text" id="disabledTextInput" class="form-control" placeholder={user.name} />
              </div>
              <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">student ID</label>
                  <input type="text" id="disabledTextInput" class="form-control" placeholder={user.username} />
              </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Add comments</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">add Submission</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>


    </div>
  )
}
