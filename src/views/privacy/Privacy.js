import React,{useState, useEffect} from 'react';
import axios from 'axios'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CImg,
  CButtonGroup,
  CCardFooter
} from '@coreui/react'

const Privacy = () => {
  return (
      <div>
        <h3>WallUp Privacy Policy</h3>
        <p>
          This privacy policy will help you understand how WallUp uses and protects the data you provide to us when you visit and use its website and related services.<br />
          We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the 
          latest changes, we advise you to frequently visit this page.
        </p>

        <h3>What User Data We Collect</h3>
        <p>
          When you visit the website, we may collect the following data:
          <ul>
            <li>Your IP address.</li>
            <li>Your contact information and email address.</li>
            <li>Other information such as interests and preferences.</li>
            <li>Data profile regarding your online behavior on our website.</li>
          </ul>
        </p>

        <h3>Why We Collect Your Data</h3>
        <p>
          We are collecting your data for several reasons:
          <ul>
            <li>To better understand your needs.</li>
            <li>To improve our services and products.</li>
            <li>To send you promotional emails containing the information we think you will find interesting.</li>
            <li>To contact you to fill out surveys and participate in other types of market research.</li>
            <li>To customize our website according to your online behavior and personal preferences.</li>
            <li>Safeguarding and Securing the Data</li>
          </ul>
        </p>

        <p>
          WallUp is committed to securing your data and keeping it confidential. We have done all in our power to prevent data theft, unauthorized access, 
          and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.
        </p>

      <h3>Our Cookie Policy</h3>
      <p>
        Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior 
        (analyze web traffic, web pages you spend the most time on, and websites you visit).
      </p>
      <p>
        The data we collect by using cookies is used to customize our website to your needs.<br />
        After we use the data for statistical analysis, the data is completely removed from our systems.
      </p>
      <p>
        Please note that cookies don't allow us to gain control of your computer in any way.<br />
        They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.<br />
        If you want to disable cookies, you can do it by accessing the settings of your internet browser.
      </p>

      <h3>Restricting the Collection of your Personal Data</h3>
      <p>
        At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:
        <br />
        When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, 
        if you don't want to disclose your personal information.<br />
        If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you.<br />
        WallUp will not lease, sell or distribute your personal information to any third parties, unless we have your permission. <br />
        We might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.
      </p>
      </div>
  )
}

export default Privacy
