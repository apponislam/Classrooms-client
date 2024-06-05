import { useLoaderData } from "react-router-dom";

const TeacherClassDetails = () => {
    const Class = useLoaderData();
    console.log(Class);

    return (
        <div>
            <h1>This Is Details Page</h1>
        </div>
    );
};

export default TeacherClassDetails;
