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

        // this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }



    handleSwitchChange(checked, policyName) {
        console.log(checked + "-" + policyName + "-" + this.props.user);

        const newPolicyArray = this.props.user.userPolicies ? this.props.user.userPolicies.split(',') : [];

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

        this.props.user.userPolicies = newPolicyArray.join(', ');

        this.setState({ userPolicyArray: newPolicyArray })

        return this.state.userPolicyArray;
    }


    checkedPolicy(user, key) {
        return user.userPolicies ? user.userPolicies.includes(key) : false
    }

    render() {


        return (
            <>
                <Row style={{ width: "75%" }}>
                    <Col span={24}>
                        <Row className="row-space" justify="left" align="top">

                            <Col span={7}><h5>SÜREÇ YÖNETİMİ</h5></Col>
                            <Col span={5}>
                                <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir" checked={this.checkedPolicy(this.props.user, "processRead")} onClick={(checked) => this.handleSwitchChange(checked, 'processRead')} />
                            </Col>
                            <Col span={5}>
                                <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" checked={this.checkedPolicy(this.props.user, "processWrite")} onClick={(checked) => this.handleSwitchChange(checked, 'processWrite')} />
                            </Col>

                        </Row>

                        <Row className="row-space" justify="left" align="top">

                            <Col span={7}><h5>KULLANICI YÖNETİMİ</h5></Col>
                            <Col span={5}>
                                <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir" checked={this.checkedPolicy(this.props.user, "userRead")} onClick={(checked) => this.handleSwitchChange(checked, 'userRead')} />
                            </Col>
                            <Col span={5}>
                                <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" checked={this.checkedPolicy(this.props.user, "userWrite")} onClick={(checked) => this.handleSwitchChange(checked, 'userWrite')} />
                            </Col>

                        </Row>

                        <Row className="row-space" justify="left" align="top">

                            <Col span={7}><h5>ORGANİZASYON YÖNETİMİ</h5></Col>
                            <Col span={5}>
                                <Switch checkedChildren=" İnceleyebilir" unCheckedChildren=" İnceleyebilir" checked={this.checkedPolicy(this.props.user, "organizationRead")} onClick={(checked) => this.handleSwitchChange(checked, 'organizationRead')} />
                            </Col>
                            <Col span={5}>
                                <Switch checkedChildren=" Değiştirebilir" unCheckedChildren=" Değiştirebilir" checked={this.checkedPolicy(this.props.user, "organizationWrite")} onClick={(checked) => this.handleSwitchChange(checked, 'organizationWrite')} />
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </>
        );
    }
}

export default UserRoleComponent;
