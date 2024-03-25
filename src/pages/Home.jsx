
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom';
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    const [sinhViens, setSinhViens] = useState([]);
  const [newSV, setNewSV] = useState({ mssv: '', name: '', grade: '', time: '', day: '' });
  const [editingSV, setEditingSV] = useState(null);

  useEffect(() => {
    fetchSinhViens();
  }, []);

  const fetchSinhViens = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sinhvien/');
      setSinhViens(response.data);
    } catch (error) {
      console.error('Error fetching sinh viens:', error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSinhViens = [...sinhViens];
    updatedSinhViens[index][name] = value;
    setSinhViens(updatedSinhViens);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:4000/sinhvien/', newSV);
        setNewSV({ mssv: '', name: '', grade: '', time: '', day: '' },() => {
            fetchSinhViens();
        });
      console.log(newSV)
      fetchSinhViens(); 
    } catch (error) {
      console.error('Error creating sinh vien:', error);
    }
  };

  const handleEdit = async (sv) => {
    setEditingSV(sv);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:4000/sinhvien/${editingSV.mssv}`, editingSV);
      fetchSinhViens();
      console.log(editingSV.mssv)
    } catch (error) {
      console.error('Error updating sinh vien:', error);
    }
  };
  const handleRemove = async (mssv) => {
    try {
      await axios.delete(`http://localhost:4000/sinhvien/${mssv}`);
      fetchSinhViens();
      console.log(mssv)
    } catch (error) {
      console.error('Error updating sinh vien:', error);
    }
  };
  

    return(
        <>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Đăng nhập</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Button variant="primary">Đăng nhập</Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      <Container className="mt-5">
        <h1>Quản lí điểm danh sinh viên</h1>
        <div className="list-group">
          {sinhViens.map((sv, index) => (
            <div key={index} className="list-group-item mb-3">
              <Card>
                <Card.Body>
                <Card.Title>Sinh viên {index + 1} - ID: {sv.mssv}</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label>MSSV:</Form.Label>
                      <Form.Control type="text" name="mssv" value={sv.mssv} onChange={(e) => handleChange(e, index)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Tên:</Form.Label>
                      <Form.Control type="text" name="name" value={sv.name} onChange={(e) => handleChange(e, index)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Điểm:</Form.Label>
                      <Form.Control type="text" name="grade" value={sv.grade} onChange={(e) => handleChange(e, index)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Thời gian:</Form.Label>
                      <Form.Control type="text" name="time" value={sv.time} onChange={(e) => handleChange(e, index)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Ngày:</Form.Label>
                      <Form.Control type="text" name="day" value={sv.day} onChange={(e) => handleChange(e, index)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleEdit(sv)}>Chỉnh sửa</Button>
                    <Button variant="primary" onClick={() => handleRemove(sv.mssv)}>Xóa</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        {editingSV && (
          <div className="mt-3">
            <h2>Chỉnh sửa sinh viên</h2>
            <Form onSubmit={handleSaveEdit}>
              <Form.Group>
                <Form.Label>MSSV:</Form.Label>
                <Form.Control type="text" name="mssv" value={editingSV.mssv} onChange={(e) => setEditingSV({...editingSV, mssv: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tên:</Form.Label>
                <Form.Control type="text" name="name" value={editingSV.name} onChange={(e) => setEditingSV({...editingSV, name: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Điểm:</Form.Label>
                <Form.Control type="text" name="grade" value={editingSV.grade} onChange={(e) => setEditingSV({...editingSV, grade: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Thời gian:</Form.Label>
                <Form.Control type="text" name="time" value={editingSV.time} onChange={(e) => setEditingSV({...editingSV, time: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ngày:</Form.Label>
                <Form.Control type="text" name="day" value={editingSV.day} onChange={(e) => setEditingSV({...editingSV, day: e.target.value})} />
              </Form.Group>
              <Button type="submit" variant="primary">Lưu chỉnh sửa</Button>
            </Form>
          </div>
        )}   
        <div className="mt-3">
          <h2>Thêm sinh viên mới</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>MSSV:</Form.Label>
            <Form.Control type="text" name="mssv" placeholder="MSSV" value={newSV.mssv} onChange={(e) => setNewSV({...newSV, mssv: e.target.value})} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên:</Form.Label>
            <Form.Control type="text" name="name" placeholder="Tên" value={newSV.name} onChange={(e) => setNewSV({...newSV, name: e.target.value})} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Điểm:</Form.Label>
            <Form.Control type="text" name="grade" placeholder="Điểm" value={newSV.grade} onChange={(e) => setNewSV({...newSV, grade: e.target.value})} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Thời gian:</Form.Label>
            <Form.Control type="text" name="time" placeholder="Thời gian" value={newSV.time} onChange={(e) => setNewSV({...newSV, time: e.target.value})} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngày:</Form.Label>
            <Form.Control type="text" name="day" placeholder="Ngày" value={newSV.day} onChange={(e) => setNewSV({...newSV, day: e.target.value})} required />
          </Form.Group>
          <Button type="submit" variant="primary">Thêm</Button>
        </Form>
      </div>
    </Container>
  </>
    );

}
export default Home
