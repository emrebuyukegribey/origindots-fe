import React, { Component } from 'react';
import { Row, Col, Switch } from 'antd';
import "./UserRole.css"

class UserRoleComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userPolicy: '',
            userPolicyArray: props.user.userPolicies != null ? props.user.userPolicies.split(',') : ''
        };

        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }



    handleSwitchChange(checked, policyName) {
        this.setState(prevState => {
            const newPolicyArray = [...prevState.userPolicyArray];

            if (checked) {
                // Add policyName to array if not already included
                if (!newPolicyArray.includes(policyName)) {
                    newPolicyArray.push(policyName);
                }
            } else {
                // Remove policyName from array if included
                const index = newPolicyArray.indexOf(policyName);
                if (index > -1) {
                    newPolicyArray.splice(index, 1);
                }
            }

            this.props.user.userPolicies=newPolicyArray.join(', ');

            return { userPolicyArray: newPolicyArray };
        });


        
    }

    

    render() {
   
        return (
            <>
                <Row style={{ width: "75%" }}>
                <Col span={24}>
                    <Row className="row-space" justify="left" align="top">

                        <Col span={7}><h5>SÜREÇ YÖNETİMİ</h5></Col>
                        <Col span={5}>
                            <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir"  onChange={(checked) => this.handleSwitchChange(checked, 'processRead')}/>
                        </Col>
                        <Col span={5}>
                            <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" onChange={(checked) => this.handleSwitchChange(checked, 'processWrite')}/>
                        </Col>

                    </Row>

                    <Row className="row-space" justify="left" align="top">

                        <Col span={7}><h5>KULLANICI YÖNETİMİ</h5></Col>
                        <Col span={5}>
                            <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir" onChange={(checked) => this.handleSwitchChange(checked, 'userRead')}/>
                        </Col>
                        <Col span={5}>
                            <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" onChange={(checked) => this.handleSwitchChange(checked, 'userWrite')}/>
                        </Col>

                    </Row>

                    <Row className="row-space" justify="left" align="top">

                        <Col span={7}><h5>ORGANİZASYON YÖNETİMİ</h5></Col>
                        <Col span={5}>
                            <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir" onChange={(checked) => this.handleSwitchChange(checked, 'organizationRead')}/>
                        </Col>
                        <Col span={5}>
                            <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" onChange={(checked) => this.handleSwitchChange(checked, 'organizationWrite')}/>
                        </Col>

                    </Row>

                </Col>
                </Row>
            </>
        );
    }
}

export default UserRoleComponent;
