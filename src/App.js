import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import classRelics from './classRelics.json';
import relicList from './relicList.json';

class App extends React.Component {
  state = {
    selectedClass: '',
    selectedQuality: '',
    essencePerHour: 0,
    selectedRelic: '',
  }

  updateClass = (e) => {
    const result = e.target.value === 'Select...' ? '' : e.target.value;
    this.setState({ selectedClass: result, selectedRelic: '' })
  }

  updateQuality = (e) => {
    const result = e.target.value === 'Select...' ? '' : e.target.value;
    this.setState({ selectedQuality: result, selectedRelic: '' })
  }

  updateEssencePerHour = (e) => {
    this.setState({ essencePerHour: parseInt(e.target.value) || 0 })
  }

  getHowLongEssenceWillTake = () => {
    const { selectedRelic, essencePerHour } = this.state;
    return Math.round(relicList[selectedRelic].cost / essencePerHour * 1000) / 1000
  }

  render() {
    const isFormValid = this.state.selectedClass !== '' && this.state.selectedQuality !== '';
    const { selectedClass, selectedQuality, selectedRelic, essencePerHour } = this.state;

    return (
      <div style={{ backgroundColor: 'lightgray', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <div>
            <Form.Group>
              <Form.Label>Select Class</Form.Label>
              <Form.Control as="select" size="lg" onChange={this.updateClass}>
                <option>Select...</option>
                <option>Sustenance</option>
                <option>Sorcery</option>
                <option>Might</option>
                <option>Fortitude</option>
                <option>Celerity</option>
              </Form.Control>
              <br />
              <Form.Label>Select Quality</Form.Label>
              <Form.Control as="select" size="lg" onChange={this.updateQuality}>
                <option>Select...</option>
                <option>Mythic</option>
                <option>Legendary</option>
                <option>Epic</option>
                <option>Rare</option>
                <option>Common</option>
              </Form.Control>
              <br />
              <Form.Label>Essence per hour</Form.Label>
              <Form.Control placeholder='0' type='number' onChange={this.updateEssencePerHour} />
            </Form.Group>
          </div>
          {isFormValid && (
            <Fragment>
              <Form.Label>Select the relic</Form.Label>
              <Container>
                <br />
                <Row>
                  {classRelics[selectedClass][selectedQuality].map((relic) => (
                    <Col xs={6} md={4} lg={2} key={relic.name}>
                      <img
                        src={'images/MercyAndMalice.png'}
                        onClick={() => this.setState({ selectedRelic: relic.name })}
                        alt={relic.name}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
              <br />
            </Fragment>
          )}
          {selectedRelic !== '' && (essencePerHour == 0 ? (
            <div>Ranhorn will fall before you finish this relic, please update essence per hour.</div>
          ) : (
            <div>It will take {this.getHowLongEssenceWillTake()} hours to complete</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
