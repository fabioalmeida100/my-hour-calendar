import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = today.getFullYear();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const formatteStartdDate = `${year}-${month}-${day}T${hour}:${minutes}:00`;
  const formatteEndDate = `${year}-${month}-${day}T${hour}:${minutes}:00`;

  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatteStartdDate);
  const [endDate, setEndDate] = useState(formatteEndDate);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [listEvents, setListEvents] = useState([]);
  const [totalWorked, setTotalWorked] = useState('');
  const [id, setId] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end - start)/1000;
    const hours = Math.floor(diff / 3600) % 24;
    const minutes = Math.floor(diff / 60) % 60;

    setTotalHours(hours);
    setTotalMinutes(minutes);
  }, [startDate, endDate]);

  useEffect(() => {
    handleTotalWorked();
  }, [listEvents]);

  const handleStartDate = (event) => {
    console.log(event.target.value);
    setStartDate(event.target.value);
  }

  const handleEndDate = (event) => {
    console.log(event.target.value);
    setEndDate(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleSave = () => {
    setId(id + 1);

    const event = {
      id: id,
      description,
      startDate,
      endDate,
      totalHours,
      totalMinutes,
      total: `${totalHours}:${totalMinutes}`,
      checked: false
    }
    setListEvents([...listEvents, event]);
  }

  const handleChecked = (checkbox) => {
    const id = Number(checkbox.target.value);
    const newList = listEvents.map((event) => {
      if(event.id === id) {
        event.checked = checkbox.target.checked;
      }
      return event;
    });
    console.log(newList);
    setListEvents(newList);

  }

  const handleDeleteAllChecked = () => {
    const newList = listEvents.filter((event) => {
      return !event.checked;
    });
    setListEvents(newList);
  }

  const handleTotalWorked = () => {
      let totalDateTimeWorked = null;

      listEvents.forEach((event) => {
        totalDateTimeWorked += (new Date(event.endDate) - new Date(event.startDate));
      });
      
      const hours = Math.floor(totalDateTimeWorked / 3600000) % 24;
      const minutes = Math.floor(totalDateTimeWorked / 60000) % 60;

      setTotalWorked(`${hours}h:${minutes}m`);
   }

  return (
    <Container className='w-50'>
      <Row>
        <Col xs={{offset:3}}>
          <h1>My Hour Calendar</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <label>Description</label>
          <input type="text" className="form-control" onChange={handleDescription}/>
        </Col>
      </Row>

      <Row>
        <Col>
          <label>Start date</label>
          <input type="datetime-local" className="form-control" onChange={handleStartDate} value={startDate}/>
        </Col>
        <Col>
          <label>End date</label>
          <input type="datetime-local" className="form-control" onChange={handleEndDate} value={endDate}/>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <button className="form-control mt-4 bg-success text-white" onClick={handleSave}>Save</button>
        </Col>
        <Col>
          <button className="form-control mt-4 bg-danger text-white" onClick={handleDeleteAllChecked}>Delete</button>
        </Col>
      </Row>
      <hr />

      <Row className='mt-4 text-center align-middle'>
      <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Total (h:mm)</th>
            </tr>
          </thead>
          <tbody>
            { 
              listEvents && listEvents.map((event) => {
                return (
                  <tr key={event.id}>
                    <td className="align-middle"><input type='checkbox' value={event.id} onClick={handleChecked}/></td>
                    <td className="align-middle">{ event.description}</td>
                    <td className="align-middle">{ event.startDate }</td>
                    <td className="align-middle">{ event.endDate}</td>
                    <td className="align-middle">{ event.total}</td>
                  </tr> 
                )
              })
            }
        </tbody>
        </table>
      </Row>

      <Row className='mt-4 mb-4'>
        <Col>
          <h5>Total trabalhado: </h5> { totalWorked }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
