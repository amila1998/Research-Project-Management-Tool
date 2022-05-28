import React from 'react'
import './Aboutus.css';

export const Aboutus = () => {
  return (
    <div class="content">
      <h2>About Us</h2>
     
      <p>The exam is structured as follows; there are two examiners (the supervisor and either an internal or an external examiner depending on the project level), who discuss the written project before the group enters the room. Each student has a right to 30 minutes examination, including assessment. Consequently, a project exam lasts between 30 minutes and three hours depending on the size of the group (1-6 persons). The students leave the room after the exam, and the examiners discuss the individual student’s performance and the written project, then each student comes into the room to receive their individual grade and feedback on their exam performance and the project. Sometimes groups decide to receive the grades together.

        Colleagues who have never tried oral group exam often ask ‘how can you distinguish between the different students and their performance?’ Firstly, I always ask the students to make a nametag, so the other examiner (and me) knows who is who in the group. Secondly, it is important to take notes during the exam, so that you afterwards can assess if the individual student answered all the questions and thereby assess the level of the answers. Thirdly, some students are very nervous during exams and do not say much, whereas other students talk a lot, here it is important for the examiners to ensure the quiet students are given the opportunity to talk, this might involve asking a talkative student to be quiet. Often, the students are good at giving space to each other to allow everyone to answer the questions.</p>
      <ul class="links">
        <li><a href="#">work</a></li>
        <div class="vertical-line"></div>
        <li><a href="#">service</a></li>
        <div class="vertical-line"></div>
        <li><a href="/">contact</a></li>
      </ul>
      <ul class="icons">
        <li>
          <i class="fa fa-twitter"></i>
        </li>
        <li>
          <i class="fa fa-facebook"></i>
        </li>
        <li>
          <i class="fa fa-github"></i>
        </li>
        <li>
          <i class="fa fa-pinterest"></i>
        </li>
      </ul>
    </div>
  )
}
