import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAllStudents } from "../service/student-service";
import { getAllCourses } from "../service/courses-service";
import { createSC } from "../service/sc-service";
import { useNavigate } from "react-router-dom";

const CreateSC = () => {
  const [students, setStudents] = useState();
  const [courses, setCourses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const findAllStudents = () => {
      getAllStudents().then((res) => setStudents(res));
    };
    findAllStudents();
  }, []);

  useEffect(() => {
    const findAllCourses = () => {
      getAllCourses().then((res) => setCourses(res));
    };
    findAllCourses();
  }, []);

  return (
    <Container>
      <Formik
        initialValues={{
          description: "",
          startDate: "",
          studentId: -1,
          coursesId: -1,
        }}
        onSubmit={(values, { setSubmitting }) => {
          createSC(values)
            .then((res) => {
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-6 mb-3">
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" />
              </div>
              <div className="col-6 mb-3">
                <Field type="date" name="startDate" className="form-control" />
                <ErrorMessage name="startDate" component="div" />
              </div>
              <div className="mb-3 col-6">
                {students && (
                  <Field as="select" className="form-select" name="studentId">
                    <option selected value={-1}>
                      Choice student
                    </option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </Field>
                )}
              </div>
              <div className="mb-3 col-6">
                {courses && (
                  <Field as="select" name="coursesId" className="form-select">
                    <option selected value={-1}>
                      Choice course
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Field>
                )}
              </div>
              <div className="col-6 mb-3">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
              <div className="col-6 mb-3">
                <button type="button" className="btn btn-outline-secondary">
                  Close
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateSC;
