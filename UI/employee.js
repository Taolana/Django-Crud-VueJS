const employee = {
    template: `
    <div>
        <button type="button"
        class="btn btn-primary mt-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="addClick()"
        >
        Add Employee
        </button>

        <table class="table table-striped">
        <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Employee Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees">
                <td>{{ employee.EmployeeId}}</td>
                <td>{{ employee.EmployeeName }}</td>
                <td>{{ employee.Department }}</td>
                <td>{{ employee.DateOfJoinig }}</td>
                <td>
                    <button type="button" 
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="editClick(employee)"
                    class="btn btn-light me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button" @click="deleteClick(employee.EmployeeId)"
                    class="btn btn-light me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
        </table>

        <div class="modal fade"id="exampleModal"tabindex="-1" aria-labelled by="exampleModalLabel"aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"id="exampleModalLabel">{{modalTitle}}</h5>
                        <button type="button"class="btn-close"data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-row bd-highlight mb-3">
                            <div class="p-2 w-50 bd-highlight">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Name</span>
                                    <input type="text" class="form-control"v-model="EmployeeName">
                                </div>
                            </div>
                            <div class="p-2 w-50 bd-highlight">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Department</span>
                                    <select class="form-select" v-model="Department">
                                        <option v-for="dep in departments" >
                                            {{ dep.DepartmentName }}
                                        </option>
                                    </select>
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Date</span>
                                    <input type="date" class="form-control"v-model="DateOfJoining">
                                </div>
                            </div>

                            <div class="p-2 w-50 bd-highlight">
                                <img class="img-fluid rounded float-start" :src="PhotoPath+PhotoFileName" />
                                <input class="m-2" type="file" @change="imageUpload">
                            </div>

                        </div>
                        

                        <button type="button" @click="createClick()"
                            v-if="EmployeeId == 0"class="btn btn-primary">
                            Create
                        </button>
                        <button type="button" @click="updateClick()"
                            v-if="EmployeeId != 0 "class="btn btn-primary">
                            Update
                        </button>

                    </div>
                </div>
            </div>
        </div>

    </div>    
    `
,

    data() {
        return {
            departments:[],
            employees:[],
            modalTitle:"",
            EmployeeId:0,
            EmployeeName:"",
            Department:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.png",
            PhotoPath: variables.PHOTOS_URL
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "department")
            .then((response) => {
                this.departments = response.data;
            });
            axios.get(variables.API_URL + "employee")
            .then((response) => {
                this.employees = response.data;
            });

        },
        addClick() {
            this.modalTitle = "Add Employee";
            this.EmployeeId = 0;
            this.EmployeeName = "";
            this.Department = "";
            this.DateOfJoining = "";
            this.PhotoFileName = "anonymous.png";
        },
        editClick(emp) {
            this.modalTitle = "Edit Employee";
            this.EmployeeId = emp.EmployeeId;
            this.EmployeeName = emp.EmployeeName;
            this.Department = emp.Department;
            this.DateOfJoining = emp.DateOfJoining;
            this.PhotoFileName = emp.PhotoFileName;
        },
        createClick() {
            axios.post(variables.API_URL + "employee",{
                EmployeeName: this.EmployeeName,
                Department: this.Department,
                DateOfJoining: this.DateOfJoining,
                PhotoFileName: this.PhotoFileName
            })
            .then((response) => {
                this.refreshData()
            });
        },
        updateClick() {
            axios.put(variables.API_URL + "employee",{
                EmployeeId: this.EmployeeId,
                EmployeeName: this.EmployeeName,
                Department: this.Department,
                DateOfJoining: this.DateOfJoining,
                PhotoFileName: this.PhotoFileName
            })
            .then((response) => {
                this.refreshData()
            });
        },
        deleteClick(id) {
            if (!confirm("Are you sure?")) {
                return;
            }
            axios.delete(variables.API_URL + "employee/"+id).then((response) => {
                this.refreshData();
            });
        },
        imageUpload(event) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            axios.post(
                variables.API_URL+"employee/savefile",
                formData
            ).then((response) => {
                this.PhotoFileName = response.data;
            });
        }
    },
    mounted: function () {
        this.refreshData();
    }
}