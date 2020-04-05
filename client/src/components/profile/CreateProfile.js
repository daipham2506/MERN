import React, { useState } from 'react'
import { Form, Input, Button, Card , Select, Spin} from 'antd';

// import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createProfile } from '../../appRedux/actions/profile'

const Option = Select.Option

const CreateProfile = () => {

  const dispatch = useDispatch();

  const {loading } = useSelector(state=>state.profile)

  const onFinish = values => {
    dispatch(createProfile(values));
  };

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  return (

    <Card style={{ boxShadow: '3px 4px 5px #888888', marginTop: 20 , marginBottom:30}} >
      <Spin spinning = {loading} tip='Loading...'>
      <h3 style={{ marginBottom: 40 }}>Create Profile</h3>
      <Form onFinish ={onFinish}
      >
        <Form.Item
          label="Professional Status"
          name="status"
          rules={[{ required: true, message: 'Please select Professional Status!' }]}
        >
          <Select
            className="gx-card"
            showSearch optionFilterProp="children" placeholder="Select Professional Status"
            style={{ width: 400 }}
          >
            <Option value="Developer">Developer</Option>
            <Option value="Junior Developer">Junior Developer</Option>
            <Option value="Senior Developer">Senior Developer</Option>
            <Option value="Manager">Manager</Option>
            <Option value="Student or Learning">Student or Learning</Option>
            <Option value="Instructor">Instructor or Teacher</Option>
            <Option value="Intern">Intern</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
        >
          <Input style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
        >
          <Input style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
        >
          <Input placeholder='City & state suggested (eg. Boston, MA)' style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item
          label="Skills"
          name="skills"
          rules={[{ required: true, message: 'Please input your skills!' }]}
        >
          <Input placeholder="Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)" style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item
          label="Github Username"
          name="githubusername"
        >
          <Input style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item
          label="Short bio"
          name="bio"
        >
          <Input placeholder="Tell us a little about yourself" style={{ width: 400 }}/>
        </Form.Item>
        <Form.Item>
          <div>
          <Button onClick={()=> toggleSocialInputs(!displaySocialInputs)}>Add Social Network Links</Button>
          <p style={{display:'inline', marginLeft:10}}> Optional</p>
          </div>
        </Form.Item>
        { displaySocialInputs && <div>
          <Form.Item name="twitter" className='social-input'>
            <i class="fab fa-twitter fa-2x"></i>
            <Input placeholder="Twitter URL" style={{ width: 400 }}/>
          </Form.Item>
          <Form.Item name="facebook" className='social-input'>
            <i class="fab fa-facebook fa-2x"></i>
            <Input placeholder="Facebook URL" style={{ width: 400 }}/>
          </Form.Item>
          <Form.Item name="youtube" className='social-input'>
            <i class="fab fa-youtube fa-2x"></i>
            <Input placeholder="YouTube URL" style={{ width: 400 }}/>
          </Form.Item>
          <Form.Item name="linkedin" className='social-input'>
            <i class="fab fa-linkedin fa-2x"></i>
            <Input placeholder="Linkedin URL" style={{ width: 400 }}/>
          </Form.Item>
          <Form.Item name="instagram" className='social-input'>
            <i class="fab fa-instagram fa-2x"></i>
            <Input placeholder="Instagram URL" style={{ width: 400 }}/>
          </Form.Item>
        </div>}
        <Form.Item>
          <Button style={{marginLeft:50}} type="primary" htmlType="submit" >Save</Button>
          <Button style={{marginLeft:30}}>Cancel</Button>
        </Form.Item>

      </Form>
      </Spin>
    </Card>
  );
};

export default CreateProfile;