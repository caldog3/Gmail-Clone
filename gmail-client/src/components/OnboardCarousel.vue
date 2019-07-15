<template>
    <carousel id="carousel"> 
        <!-- slides work in sets of two (one shown on the left and one shown on the right) -->
        <slide class="sideText">
            <h2></h2>
            &emsp;We have added two new optional features that you can use when you send emails. Recipients will not need 
            to sign up for new services or install any software to read the messages you send.
        </slide>
        <slide>
            <!-- <h1>2040 Mail Security</h1> -->
            <img src="../assets/2040.png" width="400">
        </slide>
        <!--
        <slide class="sideText">
            
            Next to the line for entering the subject of the message chain is a dropdown menu with selections
            for other privacy settings. It defaults to be sent non-encrypted (ie as a regular email)
            These settings are to send a message "ENCRYPTED", "Password protected", or as a regular email.
        </slide>
        <slide>
            <img src="../assets/SecurityDropdownOnboard.png" width="400">
        </slide> -->
        <slide class="sideText">
            <h3>Encryption</h3>
            &emsp;By default, email messages are not protected while being sent, and your email company or any government 
            conducting surveillance can read their contents. Moreover, once they have been received, anyone with access
             to those emails -- such as a hacker -- will be able to read them.
            <br>
            &emsp;Encryption gives you control over who can read your emails. It can't guarantee you perfect protection, but 
            practically speaking, enabling encryption means that even if a third party -- such as your email company -- 
            has access to your email, no one except you and your contact will be able to actually read its contents.

        </slide>
        <slide>
            <img src="../assets/EncryptedDomainOnboard.png" width="400">
        </slide>
        <slide class="sideText">
            <h3>Self-Destructing Messages</h3>
            &emsp;By default, emails in your inbox are always accessible unless you manually delete them. Even then, they are still
             accessible by the other party in the conversation. If a third party ever gains access to undeleted emails you 
             have either sent or received, any sensitive information in these emails will be available to them.
            <br>
            &emsp;Self-destructing messages allow you to control how long you want an email to stay around. If you're concerned about 
            sensitive information staying around in your or your contact's inbox longer than you think it needs to, you can set 
            an expiration timer to be *sure* that the information is deleted when you want it to be. Once the timer runs out, 
            no one -- including you and your contact -- will be able to read its contents.
        </slide>
        <slide>
            <img src="../assets/MessageExpiryOnboard.png" width="400">
        </slide>
        
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "OnboardCarousel",
    data() {
        return {

        };
    },
    components: {
        Carousel,
        Slide,
    },
}
</script>

<style scoped>
    #carousel {
        cursor: pointer;
    }
    .sideText {
        max-width: 500px;
        min-width: 200px;
        padding-right: 30px;
        padding-left: 30px;
        text-align: left;
        line-height: 2;
    }
</style>