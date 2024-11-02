import { useLoaderData } from "react-router-dom";

const TeacherAssignmentDetails = () => {
    const AssignmentDetails = useLoaderData();
    console.log(AssignmentDetails);

    return (
        <div>
            <div>
                <h1 className="font-bold text-center text-2xl my-5">Assignments</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Assignment Title</th>
                                <th>Description</th>
                                <th>Last Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssignmentDetails.map((assignmentDetails, index) => (
                                <tr key={assignmentDetails._id}>
                                    <th>{index + 1}</th>
                                    <td>{assignmentDetails.name}</td>
                                    <td>{assignmentDetails.email}</td>
                                    <td>{assignmentDetails.assignmentLink}</td>
                                    <td>
                                        <button className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4">Give Mark</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherAssignmentDetails;
