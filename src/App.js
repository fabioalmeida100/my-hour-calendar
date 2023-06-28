import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [listEvents, setListEvents] = useState([]);
  const [totalWorked, setTotalWorked] = useState('');
  const [id, setId] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    handleTotalWorked();
  }, [listEvents]);
  
  const fetchEvents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
    setListEvents(response.data);
    handleTotalWorked();
    setId(Math.max(...response.data.map((event) => event.id)) + 1);
  }

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDate = (event) => {    
    setEndDate(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleSave = async () => {
    if (!description || !startDate || !endDate) {
      alert('Preencha todos os campos');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end - start)/1000;
    const hours = Math.floor(diff / 3600) % 24;
    const minutes = Math.floor(diff / 60) % 60;

    const event = {
      id: id,
      description,
      startDate,
      endDate,
      total: `${hours}:${minutes}`,
      checked: false
    }
    
    await axios.post(`${process.env.REACT_APP_API_URL}/events`, event);
    await fetchEvents();
    
    setStartDate('');
    setEndDate('');
  }

  const handleChecked = (checkbox) => {
  
    const id = Number(checkbox.target.value);
    const newList = listEvents.map((event) => {
      if(event.id === id) {
        event.checked = checkbox.target.checked;
      }
      return event;
    });
    
    setListEvents(newList);
  }
  

  const handleDeleteAllChecked = async () => {
    listEvents.forEach((event) => {
      if(event.checked) {
        axios.delete(`${process.env.REACT_APP_API_URL}/events/${event.id}`);
      }
    });

    await fetchEvents();
  }

  const handleTotalWorked = () => {
    if (listEvents && listEvents.length > 0) {
      let totalDateTimeWorked = null;
      listEvents.forEach((event) => totalDateTimeWorked += (new Date(event.endDate) - new Date(event.startDate)));
      
      const hours = Math.floor(totalDateTimeWorked / 3600000) % 24;
      const minutes = Math.floor(totalDateTimeWorked / 60000) % 60;
      
      setTotalWorked(`${hours}h:${minutes}m`);
    }
   }

  return (
    <Container className='w-50'>
      <Row>
        <Col>
          <label className='mb-2'>Description</label>
          <input type="text" className="form-control" onChange={handleDescription}/>
        </Col>
      </Row>

      <Row className='mt-2'>
        <Col>
          <label className='mb-2'>Start date</label>
          <input type="datetime-local" className="form-control" onChange={handleStartDate} value={startDate}/>
        </Col>
        <Col>
          <label className='mb-2'>End date</label>
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
