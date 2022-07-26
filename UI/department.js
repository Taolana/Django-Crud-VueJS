const department = {
    template: `
    <div>
        <button type="button"
        class="btn btn-primary mt-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="addClick()"
        >
        Add Department
        </button>

        <table class="table table-striped">
        <thead>
            <tr>
                <th>Departement Id</th>
                <th>Departement Name</th>
                <th>Departement Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dep in departments">
                <td>{{ dep.DepartmentId}}</td>
                <td>{{ dep.DepartmentName }}</td>
                <td>
                    <button type="button" 
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="editClick(dep)"
                    class="btn btn-light me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button" @click="deleteClick(dep.DepartmentId)"
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
                        <div class="input-group mb-3">
                            <input type="text"class="form-control"v-model="DepartmentName">
                            <span class="input-group-text">Department Name</span>
                        </div>

                        <button type="button" @click="createClick()"
                            v-if="DepartmentId ==0"class="btn btn-primary">
                            Create
                        </button>
                        <button type="button" @click="updateClick()"
                            v-if="DepartmentId !=0 "class="btn btn-primary">
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
            departments: [],
            modalTitle:"",
            DepartmentId:0,
            DepartmentName:""
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "department")
            .then((response) => {
                this.departments = response.data;
            });
        },
        addClick() {
            this.modalTitle = "Add Department";
            this.DepartmentId = 0;
            this.DepartmentName = "";
        },
        editClick(dep) {
            this.modalTitle = "Edit Department";
            this.DepartmentId = dep.DepartmentId;
            this.DepartmentName = dep.DepartmentName;
        },
        createClick() {
            axios.post(variables.API_URL + "department",{
                DepartmentName: this.DepartmentName
            })
            .then((response) => {
                this.refreshData()
            });
        },
        updateClick() {
            axios.put(variables.API_URL + "department",{
                DepartmentId: this.DepartmentId,
                DepartmentName: this.DepartmentName
            })
            .then((response) => {
                this.refreshData()
            });
        },
        deleteClick(id) {
            if (!confirm("Are you sure?")) {
                return;
            }
            axios.delete(variables.API_URL + "department/"+id).then((response) => {
                this.refreshData();
            });
        }
    },
    mounted: function () {
        this.refreshData();
    }
}