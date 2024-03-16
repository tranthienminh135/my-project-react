import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getAllSCPage } from "../service/sc-service";
import { getAllStudents } from "../service/student-service";
import { getAllCourses } from "../service/courses-service";
import * as Icon from "react-bootstrap-icons";
import Pagination from "react-bootstrap/Pagination";
import ModalDelete from "../common/ModalDelete";

const initParam = {
  page: 0,
  size: 5,
  sortDirection: "ASC",
  sortBy: "id",
  description: "",
  studentId: -1,
  coursesId: -1,
  startDate: null,
  endDate: null,
};
const initSearch = {
  description: "",
  studentId: -1,
  coursesId: -1,
  startDate: null,
  endDate: null,
};

const Home = () => {
  const [sc, setSC] = useState();
  const [pageParam, setPageParam] = useState(initParam);
  const [students, setStudents] = useState();
  const [courses, setCourses] = useState();
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);

  const handleShow = (std) => {
    setShow(true);
    setItem(std);
  };

  const deleteSuccess = () => {
    findAll(pageParam);
  };

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

  useEffect(() => {
    findAll(pageParam);
  }, []);

  const findAll = (pageParam) => {
    getAllSCPage(pageParam).then((res) => {
      setSC(res);
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    const data = { ...pageParam, [name]: value };
    setPageParam(data);
  };

  const handleClearSearch = () => {
    const data = { ...pageParam, ...initSearch };
    setPageParam(data);
    findAll(data);
  };

  const handleSubmitSearch = () => {
    findAll(pageParam);
  };

  const handleSort = (sortBy) => {
    const check = pageParam.sortDirection === "ASC" ? "DESC" : "ASC";
    const sortDirection = pageParam.sortBy === sortBy ? check : "ASC";
    const data = { ...pageParam, sortBy, sortDirection };
    setPageParam(data);
    findAll(data);
  };

  const renderSortIcon = (sortBy) => {
    if (sortBy === pageParam.sortBy)
      return pageParam.sortDirection === "ASC" ? (
        <Icon.ArrowUp />
      ) : (
        <Icon.ArrowDown />
      );
  };

  const handleChangePage = (page) => {
    const data = { ...pageParam, page };
    setPageParam(data);
    findAll(data);
  };

  if (!sc) return <div>Loading...</div>;

  return (
    <Container>
      <div className="row">
        <div className="mb-3 col-6">
          <label className="form-label">Start date</label>
          <input
            value={pageParam.startDate}
            type="date"
            className="form-control"
            name="startDate"
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-3 col-6">
          <label className="form-label">End date</label>
          <input
            value={pageParam.endDate}
            type="date"
            className="form-control"
            name="endDate"
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-3 col-4">
          <input
            value={pageParam.description}
            type="text"
            className="form-control"
            placeholder="Description..."
            name="description"
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-3 col-3">
          {students && (
            <select
              className="form-select"
              name="studentId"
              onChange={handleSearchChange}
              value={pageParam.studentId}
            >
              <option selected value={-1}>
                Choice student
              </option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mb-3 col-3">
          {courses && (
            <select
              className="form-select"
              name="coursesId"
              onChange={handleSearchChange}
              value={pageParam.coursesId}
            >
              <option selected value={-1}>
                Choice course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-1 mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={handleSubmitSearch}
          >
            Search
          </button>
        </div>
        <div className="col-1 mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </div>
      </div>

      {sc.content && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                  onClick={() => handleSort("id")}
                >
                  ID
                  {renderSortIcon("id")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                  onClick={() => handleSort("startDate")}
                >
                  Start Date
                  {renderSortIcon("startDate")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                  onClick={() => handleSort("description")}
                >
                  Description
                  {renderSortIcon("description")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                  onClick={() => handleSort("student")}
                >
                  Student
                  {renderSortIcon("student")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                  onClick={() => handleSort("courses")}
                >
                  Courses
                  {renderSortIcon("courses")}
                </button>
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sc.content.length === 0 && <tr>No data</tr>}
            {sc.content.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.startDate}</td>
                <td>{item.description}</td>
                <td>{item.student.name}</td>
                <td>{item.courses.name}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleShow(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {sc.content.length > 0 && (
        <Pagination>
          <Pagination.First
            disabled={sc.number <= 0}
            onClick={() => handleChangePage(0)}
          />
          <Pagination.Prev
            disabled={sc.number <= 0}
            onClick={() => handleChangePage(sc.number - 1)}
          />
          {Array.from(Array(sc.totalPages)).map((e, i) => (
            <Pagination.Item
              active={sc.number === i}
              key={i + 1}
              onClick={() => handleChangePage(i)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={sc.number >= sc.totalPages - 1}
            onClick={() => handleChangePage(sc.number + 1)}
          />
          <Pagination.Last
            disabled={sc.number >= sc.totalPages - 1}
            onClick={() => handleChangePage(sc.totalPages - 1)}
          />
        </Pagination>
      )}
      {item && (
        <ModalDelete
          setShow={setShow}
          show={show}
          item={item}
          deleteSuccess={deleteSuccess}
        />
      )}
    </Container>
  );
};

export default Home;
