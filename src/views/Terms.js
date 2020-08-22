import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col} from "shards-react";

const createMarkup = () => {
    return {__html: "<body class='c5' style='min-width: 600px; margin: 0 auto;'><p class='c4'><span class='c15 c14'>Terms of Use</span></p><p class='c4 c6'><span class='c14 c15'></span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>THIS AGREEMENT WAS LAST UPDATED ON May 30</span><span class='c1 c13'>th</span><span class='c0'>, 2018</span></p><p class='c4'><span class='c1'><br><br></span><span class='c2'>PLEASE SCROLL DOWN AND READ THIS AGREEMENT IN ITS ENTIRETY BEFORE YOU USE ANY OF OUR PRODUCTS OR SERVICES OR BECOME A MEMBER OF BITCOIN.LIVE. </span></p><p class='c4 c6'><span class='c2'></span></p><p class='c4 c6'><span class='c2'></span></p><p class='c4'><span class='c1'>This Terms of Use Agreement (the 'Agreement') and our </span><span class='c1 c8'><a class='c12' href='https://bitcoin.live/policy'>Privacy Policy</a></span><span class='c1'>, which is hereby incorporated by reference, governs your use of BITCOIN.LIVE and www.bigleaguefinance.com site, products and services ('BITCOIN.LIVE” or the 'Service'); BITCOIN.LIVE provides financial infotainment and education from BITCOIN.LIVE ('we' or 'us'). By accessing or using the products, services, website and software provided through or in connection with BITCOIN.LIVE, you signify that you have read, understood, and agree to be bound by this Agreement and our current Privacy Policy, whether or not you are a registered member. If you do not agree to any of these terms or any future Terms of Use, you may not use or access (or continue to access) the Service.<br><br></span><span class='c7'>1. Changes to the Agreement.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>We may change the terms of this Agreement at any time and without prior notice. If we do this, we will post the changes to this page and indicate at the top of the page the date the Agreement was last revised. You can access this document at any time by selecting the Terms of Use link located at the bottom of every page on the BITCOIN.LIVE web site. Your use of BITCOIN.LIVE after changes are made to this Agreement means that you agree to be bound by such changes. As our business changes constantly, this Agreement, our Privacy Policy, and other pertinent company policies may change also. You should check our web site frequently to see recent changes.<br><br></span><span class='c7'>2. Legal Disclaimer.</span><span class='c14 c1 c10'>&nbsp;</span></p><p class='c4 c6'><span class='c1 c10 c14'></span></p><p class='c4'><span class='c1 c10'>BITCOIN.LIVE is a content provider and publisher and is not a registered broker-dealer or investment advisor. By accessing BITCOIN.LIVE &nbsp;websites and/or using BITCOIN.LIVE &nbsp;products and services, including without limitation any and all content available on or through the Service, you understand and agree that the material provided in BITCOIN.LIVE &nbsp;products and services is for informational and educational purposes only, and that no mention of a particular security in any BITCOIN.LIVE &nbsp;product or service constitutes a recommendation to buy, sell, or hold that or any other security, or that any particular security, portfolio of securities, transaction or investment strategy is suitable for any specific person. You further understand and agree that none of the information providers or their affiliates will advise you personally concerning the nature, potential, value or suitability of any particular security, portfolio of securities, transaction, investment strategy or other matter. To the extent any of the information contained in any BITCOIN.LIVE &nbsp;product or service may be deemed to be investment advice, such information is impersonal and not tailored to the investment needs of any specific person.</span><span class='c1'><br><br></span><span class='c1 c10'>You understand and agree that any BITCOIN.LIVE &nbsp;product or service may contain opinions from time to time with regard to any securities mentioned in other BITCOIN.LIVE &nbsp;products or services, and that those opinions may be different from those contained in another BITCOIN.LIVE &nbsp;product or service. You understand and agree that, from time to time, any or all of the information providers or their affiliates may hold positions in securities mentioned and that they may trade for their own account. In cases where the position is held at the time of publication, appropriate disclosure is made as of the time of publication.</span><span class='c1'><br><br></span><span class='c1 c10'>You understand and agree that performance data is supplied by sources believed to be reliable, that the calculations in any BITCOIN.LIVE &nbsp;publication or service are made using such data, and that such data is not guaranteed by these sources, the information providers, or any other person or entity, and may not be accurate or complete.</span><span class='c0'><br></span></p><p class='c4'><span class='c0'>You understand that all Analysts operating on BITCOIN.LIVE are independent consultants and are not employeed or represent BITCOIN.LIVE in any manner. &nbsp;All Analysts content on the BITCOIN.LIVE site is their own work and does not represent the opinion of BITCOIN.LIVE or any of the other Analysts on the BITCOIN.LIVE platform. &nbsp;</span></p><p class='c4'><span class='c1'><br></span><span class='c1 c10'>BEFORE SELLING OR BUYING ANY CRYPTOCURRENCY OR OTHER INVESTMENT YOU SHOULD CONSULT WITH A QUALIFIED BROKER OR OTHER FINANCIAL PROFESSIONAL TO VERIFY PRICING INFORMATION AND TO SOLICIT ADVICE AS TO THE APPROPRIATENESS OF A GIVEN TRANSACTION OR INVESTMENT.</span><span class='c1'><br><br></span><span class='c2'>3. Registration.</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c0'>In order to access certain features of the Service, you will have to become a member of BITCOIN.LIVE by subscribing and creating a BITCOIN.LIVE account. When you create your account, you must provide accurate and complete information, and keep that information up to date. You are solely responsible for maintaining the confidentiality of your user name and password and for any and all activities (including purchases) that are conducted through your account. &nbsp;You may never use another user's account without permission.<br><br>By providing BITCOIN.LIVE your email address you consent to our using the email address to send you Service-related notices, including any notice required by law, in lieu of written communication by postal mail. You may unsubscribe to certain email communications at any time though the 'Manage Account' link at the top of every BITCOIN.LIVE page when you are logged in. We may also use your email address to send you other messages, including changes to BITCOIN.LIVE features and special offers. If you do not want to receive such email messages, you may opt out by sending an email message to admin@BITCOIN.LIVE &nbsp; with the word 'UNSUBSCRIBE' in the subject field.</span></p><p class='c4 c6'><span class='c0'><br><br></span></p><p class='c4'><span class='c1'><br></span><span class='c7'>4. Privacy.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c0'>We store or keep very limited data on our members. &nbsp;Registration data and other information about you are subject to our Privacy Policy. </span></p><p class='c4'><span class='c1'><br><br></span><span class='c2'>5. Fees and Payments. </span></p><p class='c4'><span class='c7'><br>a.</span><span class='c1'>&nbsp;For subscribers to BITCOIN.LIVE subscription services only, you agree to pay the subscription fees and any other charges (including any applicable taxes) at the rates in effect when the charges were incurred. We will bill all charges automatically to your credit card. Subscription fees will be billed at the beginning of your subscription or any renewal. Annual fees and charges for subscription services, and monthly fees once billed, are nonrefundable (subject to applicable law).We may change the fees and charges then in effect, or add new fees or charges, by giving you notice in advance. If you want to use a different credit card or there is a change in credit card validity or expiration date, or if you want to change your service, or change or update any other relevant account information, you may do so by clicking the 'Your Account' link located within your profile settings of every BITCOIN.LIVE page when you are logged in. If you believe someone has accessed BITCOIN.LIVE using your user name and password without your authorization, you must immediately notify us via email. You can contact us via the 'Contact Us' section of BITCOIN.LIVE and, located at the bottom of every page. <br><br>b.BITCOIN.LIVE &nbsp;will automatically bill you according to your subscription choice upon completion of the registration form. <br><br></span><span class='c7'>c. </span><span class='c0'>Your subscription will renew automatically at the beginning of each subscription period (monthly, quarterly or annually), unless you terminate it. You can cancel your subscription at any time by contacting us at admin@BITCOIN.LIVE. Cancellations take effect as of your next billing date, which is noted on the profile settings page. As previously stated, fees cannot be refunded or prorated. You must cancel your subscription before it renews in order to avoid billing of subscription fees for the renewal term to your credit card.<br></span></p><p class='c4'><span class='c1'><br></span><span class='c7'>6. User Content.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c0'>Some areas of the Service may allow users to post feedback, comments, questions, and other information ('User Content'). You are solely responsible for your User Content that you upload, publish, display, link to or otherwise make available (hereinafter, 'post') on the Service, and you agree that we are only acting as a passive conduit for your online distribution and publication of your User Content. By posting any User Content on the Service, you expressly grant, and you represent and warrant that you have a right to grant, to BITCOIN.LIVE &nbsp;a royalty-free, sub licensable, transferable, perpetual, irrevocable, non-exclusive, worldwide license to use, reproduce, modify, publish, list information regarding, edit, translate, distribute, publicly perform, publicly display, and make derivative works of all such User Content and your name, voice, and/or likeness as contained in your User Content, in whole or in part, and in any form, media or technology, whether now known or hereafter developed for use in connection with the Service.<br><br>You agree not to post User Content that: (i) may create a risk of harm, loss, physical or mental injury, emotional distress, death, disability, disfigurement, or physical or mental illness to you, to any other person, or to any animal; (ii) may create a risk of any other loss or damage to any person or property; (iii) may constitute or contribute to a crime or tort; (iv) contains any information or content that we deem to be unlawful, harmful, abusive, racially or ethnically offensive, defamatory, infringing, invasive of personal privacy or publicity rights, harassing, humiliating to other people (publicly or otherwise), libelous, threatening, or otherwise objectionable; (v) contains any information or content that is illegal; (vi) contains any information or content that you do not have a right to make available under any law or under contractual or fiduciary relationships, including without limitation material, non-public information about companies that you are not authorized to disclose; (vii) contains any information or content that you know is not correct and current; or (viii) contains advertisements, solicitations, chain letters, pyramid schemes, investment opportunities, or other unsolicited commercial communication (except as otherwise expressly permitted by us). You agree that any User Content that you post does not and will not violate third-party rights of any kind, including without limitation any Intellectual Property Rights (as defined below), rights of publicity and privacy. BITCOIN.LIVE &nbsp;reserves the right, but is not obligated, to reject and/or remove any User Content that BITCOIN.LIVE &nbsp;believes, in its sole discretion, violates these provisions.<br><br>For the purposes of this Agreement, 'Intellectual Property Rights' means all patent rights, copyright rights, mask work rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights and other intellectual property rights as may now exist or hereafter come into existence, and all applications therefore and registrations, renewals and extensions thereof, under the laws of any state, country, territory or other jurisdiction.<br><br>BITCOIN.LIVE take no responsibility and assume no liability for any User Content that you or any other Users or third parties post or send over the Service. You understand and agree that any loss or damage of any kind that occurs as a result of the use of any User Content that you send, upload, download, stream, post, transmit, display, or otherwise make available or access through your use of the Service, is solely your responsibility. BITCOIN.LIVE is not responsible for any public display or misuse of your User Content. You understand and acknowledge that you may be exposed to User Content that is inaccurate, offensive, indecent, or objectionable, and you agree that BITCOIN.LIVE shall not be liable for any damages you allege to incur as a result of such User Content.<br><br>You are solely responsible for your interactions with other BITCOIN.LIVE users. We reserve the right, but have no obligation, to monitor disputes between you and other users.</span></p><p class='c4'><span class='c1'><br><br></span><span class='c2'>7. Limitations on Use.</span></p><p class='c4'><span class='c1'><br></span><span class='c7'>a.</span><span class='c1'>&nbsp;Access to the subscriber areas of BITCOIN.LIVE is solely limited to the registered subscriber and is non-transferable to any third party. Only one individual may access BITCOIN.LIVE at the same time using the same user name or password, unless otherwise expressly permitted in writing by BITCOIN.LIVE.<br><br></span><span class='c7'>b.</span><span class='c1'>&nbsp;The content available through BITCOIN.LIVE &nbsp;, including, without limitation, software, images, text, graphics, illustrations, logos, patents, trademarks, service marks, copyrights, photographs, audio, videos and music (the 'Content'), and all Intellectual Property Rights related thereto, is our property or the property of our licensors and is protected by copyright and other intellectual property laws. You may display or print the Content for your personal, non-commercial use only. Subject to the terms and conditions of this Agreement, you are hereby granted a non-exclusive, limited, personal license to use the Service. BITCOIN.LIVE reserves all rights not expressly granted herein in the Service and its Content. BITCOIN.LIVE may terminate this license at any time for any reason or no reason.<br><br>You agree not to sell, publish, license, rent, modify, distribute, copy, reproduce, transmit, retransmit, publicly display, publicly perform, adapt, edit, create derivative works from, or otherwise provide access to the Content to anyone, including, but not limited to your fellow employees, friends or family, with the following two exceptions:<br><br></span><span class='c7'>(i)</span><span class='c1'>&nbsp;You may occasionally distribute a copy of an article or a portion of an article from BITCOIN.LIVE &nbsp;in non-electronic form to a few individuals without charge, provided you include all copyright and other proprietary rights notices in the same form in which the notices appear in BITCOIN.LIVE , original source attribution, and the phrase 'Used with permission from BITCOIN.LIVE .com' or 'Used with permission from BITCOIN.LIVE &nbsp;Media, INC.' Please contact us if you need to distribute content from BITCOIN.LIVE to a larger number of individuals, on a regular basis or in any other manner not expressly permitted by this Agreement. You can contact us via the 'Contact Us' section of BITCOIN.LIVE, located in the Company section in the main navigation on the left side of every page.<br><br></span><span class='c7'>(ii)</span><span class='c1'>&nbsp;You may use our 'E-mail to a Friend' service, as it is available, to e-mail an article from BITCOIN.LIVE to a few individuals, without charge.<br><br></span><span class='c7'>c.</span><span class='c1'>&nbsp;You agree not to create abstracts from, scrape, frame, or display headlines from our Content for use on another web site or service. Without limiting the generality of this Section 6, you agree not to post any Content from BITCOIN.LIVE to newsgroups, mail lists or electronic bulletin boards, without our written consent.<br><br>To request consent for uses of the Content and Service not expressly permitted by this Agreement, please contact BITCOIN.LIVE customer service at admin@BITCOIN.LIVE<br><br></span><span class='c7'>d.</span><span class='c1'>&nbsp;You agree not to use BITCOIN.LIVE for any unlawful purpose. We reserve the right to terminate or restrict your access to BITCOIN.LIVE at any time and without notice if, in our opinion, your use of BITCOIN.LIVE may violate any laws, infringe upon another person's rights or violate the terms of this Agreement. Also, we may refuse to grant you a user name that impersonates someone else, is protected by trademark or other proprietary right law, or is vulgar or otherwise offensive.<br><br></span><span class='c7'>8. Code of Conduct.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c0'>While using any BITCOIN.LIVE product or service, you agree not to:</span></p><p class='c16'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Restrict or inhibit any other visitor or member from using any BITCOIN.LIVE &nbsp;product or service, including, without limitation, by means of 'hacking' or 'cracking' or defacing any portion of the BITCOIN.LIVE &nbsp;web site;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Use any BITCOIN.LIVE product or service for any unlawful purpose;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Express or imply that any statements you make are endorsed by us, without our prior written consent;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Engage in spamming;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Transmit any software or other materials that contain any virus, worm, time bomb, Trojan horse, or other harmful or disruptive component;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Modify, adapt, sublicense, translate, sell, reverse engineer, decompile or disassemble any portion of any of BITCOIN.LIVE web site;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Remove any copyright, trademark, or other proprietary rights notices contained in the BITCOIN.LIVE web site;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>'Frame' or 'mirror' any part of BITCOIN.LIVE web site without our prior written authorization;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, 'data mine,' or in any way reproduce or circumvent the navigational structure or presentation of any BITCOIN.LIVE product or service or its contents;</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Harvest or collect information about visitors to or members of BITCOIN.LIVE without their express consent; or</span></p><p class='c3'><span style='overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 9.00px; height: 8.00px;'><img alt='http://www.minyanville.com/images/bullet.jpg' src='images/image1.jpg' style='width: 9.00px; height: 8.00px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);' title=''></span><span class='c0'>Permit anyone without an account or subscription to use any BITCOIN.LIVE product or service through your subscription, user name or password.</span></p><p class='c4'><span class='c1'><br>While using BITCOIN.LIVE products or services you agree to comply with all applicable laws, rules and regulations.<br><br></span><span class='c7'>9. Additional Representations and Warranties.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>You shall be solely responsible for your own User Content and the consequences of posting or publishing it. In connection with User Content, you affirm, represent and warrant, in addition to the other representations and warranties in this Agreement, the following:<br><br>a. You are at least 18 years of age, or if you are under 18 years of age you are either an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in this Agreement, and to abide by and comply with this Agreement.<br><br>b. You have the written consent of each and every identifiable natural person in the User Content to use such person’s name or likeness in the manner contemplated by the Service and this Agreement, and each such person has released you from any liability that may arise in relation to such use. <br><br>c. Your User Content and BITCOIN.LIVE 's use thereof as contemplated by this Agreement and the Service will not infringe any rights of any third party, including but not limited to any Intellectual Property Rights, privacy rights and rights of publicity.<br><br></span><span class='c7'>10. Links to Other Websites.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>Our products and services may contain links to other Internet web sites or resources. BITCOIN.LIVE &nbsp; neither controls nor endorses such other web sites, nor will it review or approve any content that appears on such other web sites. If you choose to follow a link to another web site, the terms of service and privacy policy of that web site, not of BITCOIN.LIVE and , apply. You acknowledge and agree that BITCOIN.LIVE shall not be held responsible for the legality, accuracy, or inappropriate nature of any content, advertising, products, services, or information located on or through any other websites, nor for any loss or damages caused or alleged to have been caused by the use of or reliance on any such content.<br><br></span><span class='c7'>11.</span><span class='c0'>&nbsp;Disclaimers of Warranties and Limitations on Liability. </span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>YOU AGREE THAT YOUR ACCESS TO AND USE OF BITCOIN.LIVE AND THE CONTENT AVAILABLE THROUGH BITCOIN.LIVE &nbsp;IS ON AN 'AS-IS', 'AS AVAILABLE' BASIS. BITCOIN.LIVE &nbsp; AND ITS SUBSIDIARIES, AFFILIATES, SHAREHOLDERS, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, INFORMATION PROVIDERS AND CONTRIBUTORS AND LICENSORS ('BITCOIN.LIVE &nbsp;PARTIES') SPECIFICALLY DISCLAIM ANY REPRESENTATION OR WARRANTY, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY REPRESENTATION OR WARRANTY OF MERCHANTABILITY, NONINFRINGEMENT OR FITNESS FOR A PARTICULAR PURPOSE. WITHOUT LIMITING THE FOREGOING, BITCOIN.LIVE PARTIES DO NOT WARRANT THAT THE CONTENT IS ACCURATE, RELIABLE OR CORRECT; THAT THE SERVICE WILL MEET YOUR REQUIREMENTS; THAT THE SERVICE WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED OR SECURE; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOU’RE USE OF BITCOIN.LIVE PRODUCTS OR SERVICES, THE MATERIALS ON OUR WEB SITE AND ANY MATERIALS PROVIDED THROUGH OUR WEB SITE ARE ENTIRELY AT YOUR OWN RISK.<br><br>YOU ACKNOWLEDGE THAT BITCOIN.LIVE &nbsp;PARTIES WILL NOT BE LIABLE (JOINTLY OR SEVERALLY) TO YOU OR ANY OTHER PERSON AS A RESULT OF YOUR ACCESS OR USE OF BITCOIN.LIVE &nbsp;FOR INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, LOST SAVINGS AND LOST REVENUES (COLLECTIVELY, THE 'EXCLUDED DAMAGES'), WHETHER OR NOT CHARACTERIZED IN NEGLIGENCE, TORT, CONTRACT, OR OTHER THEORY OF LIABILITY, EVEN IF ANY OF BITCOIN.LIVE &nbsp;PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF OR COULD HAVE FORESEEN ANY OF THE EXCLUDED DAMAGES, AND IRRESPECTIVE OF ANY FAILURE OF AN ESSENTIAL PURPOSE OF A LIMITED REMEDY.<br><br>YOU AGREE THAT THE MAXIMUM LIABILITY OF BITCOIN.LIVE &nbsp;PARTIES FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION UNDER THIS AGREEMENT SHALL BE THE TOTAL AMOUNT PAID BY YOU, IF ANY, FOR ACCESS TO ANY BITCOIN.LIVE &nbsp;PRODUCTS OR SERVICES.<br><br>THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION.<br><br>The Service is controlled from its facilities in the United States. BITCOIN.LIVE make no representations that the Service is appropriate or available for use in other locations. Those who access or use the Service from other jurisdictions do so at their own volition and are responsible for compliance with local law.<br><br></span><span class='c7'>12. General.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c1'>This Agreement contains the final and entire agreement between you and BITCOIN.LIVE &nbsp; regarding your use of BITCOIN.LIVE and supersedes all previous and contemporaneous verbal or written negotiations, understandings, or agreements regarding your use of BITCOIN.LIVE. BITCOIN.LIVE may discontinue or change BITCOIN.LIVE, or its availability to you, at any time. This Agreement is personal to you, which means that you may not assign your rights or obligations under this Agreement to anyone. No third party is a beneficiary of this Agreement. You agree that this Agreement, as well as any and all claims arising from this Agreement will be governed by and construed in accordance with the laws of the State of New York, United States of America applicable to contracts made entirely within New York and wholly performed in New York, without regard to any conflict or choice of law principles. The sole jurisdiction and venue for any litigation arising out of this Agreement will be an appropriate federal or state court located in New York. This Agreement will not be governed by the United Nations Convention on Contracts for the International Sale of Goods. If any provision of this Agreement is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of this Agreement, which shall remain in full force and effect. No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.<br><br></span><span class='c7'>13. Indemnification.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4' id='h.gjdgxs'><span class='c1'>You agree to indemnify, defend and hold BITCOIN.LIVE &nbsp;Parties harmless from and against any and all claims, damages, losses, costs (including reasonable attorneys' fees), or other expenses that arise directly or indirectly out of or from (a) your breach of this Agreement, including any violation of the Code of Conduct above; (b) any allegation that any materials that you submit to us or transmit to our web sites infringe or otherwise violate the copyright, trademark, trade secret or other intellectual property or other rights of any third party; and/or (c) your activities in connection with the Service or any BITCOIN.LIVE &nbsp;products or services.<br><br></span><span class='c7'>14. Notification Procedures.</span><span class='c0'>&nbsp;</span></p><p class='c4 c6'><span class='c0'></span></p><p class='c4'><span class='c0'>BITCOIN.LIVE may provide notifications, whether such notifications are required by law or are for marketing or other business-related purposes, to you via email notice, written or hard copy notice, or through conspicuous posting of such notice on our website, as determined by BITCOIN.LIVE in our sole discretion. BITCOIN.LIVE reserves the right to determine the form and means of providing notifications to our Users, provided that you may opt out of certain means of notification as described in this Agreement.</span></p><p class='c6 c11'><span class='c9'></span></p></body>"};
}

const Terms = () => (
    <Container  style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 100 }}>
        <Row >
            <Col md={{ize: 10, offset: 2 }} dangerouslySetInnerHTML={createMarkup()}>

            </Col>
            </Row>
    </Container>
);

Terms.propTypes = {
    smallStats: PropTypes.array
};

Terms.defaultProps = {

};

export default Terms;