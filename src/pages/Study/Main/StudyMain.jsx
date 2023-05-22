import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../Header";
import { StudyList } from "../../Common/StudyList";

// 캘린더 라이브러리
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../../styles/calendar.css';
import { MyStudyList } from "../../Common/MyStudyList";
import AxiosApi from "../../../api/AxiosAPI";
import moment from "moment";





const StudyContainer = styled.div`
display: flex;
width: 1200px;
flex-direction: column;
overflow-x: hidden;


.title_my {
    margin: 40px;
}

.list_box {
    display: flex;
    flex-direction: column;
    width: 1200px;
    height: 500px;
    padding-top: 80px;
    background-color: #f1f1f1;

}

.block_box {
    display: flex;
    flex-direction: row;
}

.item {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}


.StudySchedule {
    display: flex;
    flex-direction: column;
}

.boxbox {
    display: flex;
    width: 1000px;
}

.title_schdule {}

.schedule_box {
    width: 400px;
    background-color: #f1f1f1;
    height: 475px;
    display: flex;
    justify-content:center;
    display: flex;
    flex-wrap: wrap;


}

.calendar_box {
    width: 600px;
    margin: 0;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    padding : 20px 100px 20px 100px;
}
.scBox{
    background-color: white;
    height: 80px;
    width: 350px;
    margin-top: 20px;
    border-radius:10px;
}
.profile {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        margin-left: 20px;
        background-color: red;
        margin-bottom:5px;
        margin-right:5px;

    }
.date {
        font-size : 25px;
        font-weight : bolder;
        margin : 0px;
        padding-top: 10px;
        padding-left: 10px;

    }
    .item {
        display: flex;
        align-items: center;
        margin-top:5px;

    }
    .item2{
        display: flex;
        align-items: center;
        margin-top: -35px;
        margin-left:120px;
    }
    .scName{
        font-size:16px;
        padding-bottom:5px;
    }
`;


const StudyMain = () => {
    const [studyMemInfo, setstudyMemInfo] = useState([]);
    const [value, onChange] = useState(new Date());
    const userId = 1;

    
    useEffect(() => {
        const studyMemInfo = async () => {
            const rsp = await AxiosApi.studyUserScGet(userId); // 전체 조회
            if(rsp.status === 200) setstudyMemInfo(rsp.data);
            console.log(rsp.data);
        };
        studyMemInfo();
      }, [userId])

      const tileContent = ({ date }) => {
        const formattedDate = date.toISOString().split('T')[0];
        const matchingDataCount = studyMemInfo.filter(sc => moment(sc.studyScDate).format('YYYY-MM-DD') === formattedDate).length;
      
        if (matchingDataCount > 0) {
          return (
            <div className="tileContentContainer">
              {Array.from({ length: matchingDataCount }, (_, index) => (
                <div key={index} className="dot" />
              ))}
            </div>
          );
        }
      
        return null;
      };

    return (
        <>
            <Header></Header>

            <StudyContainer>

                <div className="list_box">
                    <h1 className="title_my">나의 스터디 📚</h1>
                    <MyStudyList />
                </div>


                <form>
                    <h1 className="title_schdule">나의 일정 🗓</h1>
                    <div className="boxbox">
                        <div className="calendar_box">
                        <Calendar onChange={onChange}
                            value={value}
                            tileContent={tileContent}
                        />
                       
                        </div>
                        <div className="schedule_box">
                            {studyMemInfo &&
                            studyMemInfo.map((sc) => (
                                <div className="scBox" key={sc.studyScId}>
                                <div className="item">
                                    <h1 className="date">{moment(sc.studyScDate).format('MM월DD일')}</h1>
                                    <div className="profile" style={{ background: `${sc.studyProfile}` }}></div>
                                    <p className="scName">{sc.studyName}</p>
                                    <style>
                                    {`
                                    .tileContentContainer {
                                        display: flex;
                                        justify-content: center;
                                        flex-wrap: wrap;
                                        
                                    }
                                    
                                    .dot {
                                        width: 10px;
                                        height: 10px;
                                        background-color: ${sc.studyProfile};
                                        border-radius: 50%;
                                        margin-right: 4px; 

                                    }
                                    `}
                                </style>
                                </div>

                                <div className="item2">
                                    <h2 className="scName">{sc.studyScContent}</h2>
                                </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </form>

                    <StudyList></StudyList>
                    </StudyContainer>
                </>
                )
            }





export default StudyMain;