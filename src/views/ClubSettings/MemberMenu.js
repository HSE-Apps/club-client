import React, {useState, useContext, useEffect} from 'react'

import {Button, Typography, Avatar, Tooltip, List, Input,message} from 'antd'
import { CloseOutlined, UserAddOutlined, UserDeleteOutlined, SearchOutlined} from '@ant-design/icons';

import axios from 'axios'

import ClubContext from '../../util/ClubContext'
import AuthContext from '../../contexts/AuthContext'


const {Text} = Typography

const MemberMenu = ({ form, errors, edited, setEdited, clubMembers, setForm, club, updateClub, setErrors, setClub, setClubMembers }) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (clubMembers) {
            console.log(clubMembers);
        }
    }, [clubMembers, refreshKey]);

    const kickMember = async (msIdToKick) => {
        console.log(msIdToKick);
        try {
            const clubRes = await axios.delete(`${process.env.REACT_APP_CLUB_API}/club/${club.url}/members/`, {
                headers: {
                    'x-user-id': msIdToKick
                }
            });
            const clubData = clubRes.data;

            setClub(clubData);
            setClubMembers({
                ...clubMembers,
                members: clubMembers.members.filter((user) => user.msId !== msIdToKick),
                officers: clubMembers.officers.filter((user) => user.msId !== msIdToKick)
            });
            message.success('Club member kicked', 5);
            setRefreshKey(prevKey => prevKey + 1);
        } catch (err) {
            console.log(err.msg);
            setErrors([{ "msg": "Server error" }]);
        }
    }

    const promoteMember = async (idToPromote) => {
        try {
            const clubRes = await axios.put(`${process.env.REACT_APP_CLUB_API}/club/${club.url}/members/${idToPromote}/promote`);
            const clubData = clubRes.data;

            setClub(clubData);
            const userToPromote = clubMembers.members.find((user) => user._id == idToPromote);

            setClubMembers({
                ...clubMembers,
                members: clubMembers.members.filter((user) => user._id != idToPromote),
                officers: [userToPromote].concat(clubMembers.officers)
            });
            message.success('Club member promoted', 5);
            setRefreshKey(prevKey => prevKey + 1);
        } catch (err) {
            console.log(err);
            console.log(err.msg);
            setErrors([{ "msg": "Server error" }]);
        }
    }

    const demoteMember = async (idToDemote) => {
        console.log(idToDemote);
        try {
            const clubRes = await axios.put(`${process.env.REACT_APP_CLUB_API}/club/${club.url}/members/${idToDemote}/demote`);
            const clubData = clubRes.data;

            setClub(clubData);
            const userToDemote = clubMembers.officers.find((user) => user._id == idToDemote);

            setClubMembers({
                ...clubMembers,
                officers: clubMembers.officers.filter((user) => user._id != idToDemote),
                members: [userToDemote].concat(clubMembers.members)
            });
            message.success('Club member demoted', 5);
            setRefreshKey(prevKey => prevKey + 1);
        } catch (err) {
            console.log(err.msg);
            setErrors([{ "msg": "Server error" }]);
        }
    }

    return (
        <>
            {clubMembers && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "95%" }}>
                        <List
                            header={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <Text> Members </Text>
                                    <Input
                                        suffix={<SearchOutlined />}
                                        placeholder="Search club members"
                                        bordered={false}
                                        style={{ width: '25%' }}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            }
                            itemLayout="horizontal"
                            dataSource={
                                (search && search.trim() !== "") ?
                                    [...clubMembers.sponsors, ...clubMembers.officers, ...clubMembers.members].filter((user) => user.name.toLowerCase().includes(search.toLowerCase())) :
                                    [...clubMembers.sponsors, ...clubMembers.officers, ...clubMembers.members]
                            }
                            renderItem={user => {
                                let description;
                                let actions = [];
                                if (clubMembers.sponsors.includes(user)) {
                                    description = <Text>{"Sponsor"}</Text>;
                                } else if (clubMembers.officers.includes(user)) {
                                    description = <Text>{"Officer"}</Text>;
                                    actions.push(<Button type="primary" onClick={() => demoteMember(user.msId)}>Demote</Button>);
                                    actions.push(<Button type="danger" onClick={() => kickMember(user.msId)}>Kick</Button>);
                                } else {
                                    description = <Text>{"Member"}</Text>;
                                    actions.push(<Button type="primary" onClick={() => promoteMember(user.msId)}>Promote</Button>);
                                    actions.push(<Button type="danger" onClick={() => kickMember(user.msId)}>Kick</Button>);
                                }
                                return (
                                    <List.Item
                                        actions={actions}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size={45} src={user.profilePictureURL} />}
                                            title={user.name}
                                            description={description}
                                        />
                                    </List.Item>
                                );
                            }}
                        />
                    </div>
                </div>
            )}
            {clubMembers?.applicants && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "95%" }}>
                        <List
                            header="Applicants"
                            itemLayout="horizontal"
                            dataSource={clubMembers.applicants}
                            renderItem={member => (
                                <List.Item
                                    actions={[
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Tooltip title="Accept">
                                                <UserAddOutlined 
                                                    style={{ fontSize: "18px", color: "#52c41a", cursor: "pointer" }}
                                                />
                                            </Tooltip>
                                        </div>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={45} src={member.profilePictureURL} />}
                                        title={member.name}
                                        description={<Text> {club.titles[member._id] || "Applicant"} </Text>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default MemberMenu;