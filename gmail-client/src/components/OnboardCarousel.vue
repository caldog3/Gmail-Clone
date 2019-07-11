<template>
    <carousel id="carousel"> 
        <!-- slides work in sets of two (one shown on the left and one shown on the right) -->
        <slide class="sideText">
            
            This quick introduction will show the various security features that are available for
            use in this email provider. 
        </slide>
        <slide>
            <h1>2040 Mail Security</h1>
            <img src="../assets/2040.png" width="400">
        </slide>
        <slide class="sideText">
            
            When sending a message you may use this feature.  "Set Expiring Message" allows you to
            designate how long from now you want the message to still be accessible.  Once that timer
            runs out, the message will expire, and no one (including yourself) will have access to the
            message's contents anymore.
        </slide>
        <slide>
            <img src="../assets/MessageExpiryOnboard.png" width="400">
        </slide>
        <slide class="sideText">
            
            Next to the line for entering the subject of the message chain is a dropdown menu with selections
            for other privacy settings. It defaults to be sent non-encrypted (ie as a regular email)
            These settings are to send a message "ENCRYPTED", "Password protected", or as a regular email.
        </slide>
        <slide>
            <img src="../assets/SecurityDropdownOnboard.png" width="400">
        </slide>
        <slide class="sideText">
            
            If the recipient you are emailing has an email with an "@2040mail.com" domain, the security setting you can
            select from the dropdown is to send the message encrypted.  An encrypted message is sent as an indecipherable
            message that can only be decrypted by the recipient(s) you sent the message to.
        </slide>
        <slide>
            <img src="../assets/EncryptedDomainOnboard.png" width="400">
        </slide>
        <slide class="sideText">
            
            If the recipient you are emailing does not have an "@2040mail.com" domain, the security setting you can
            select from the dropdown is to send the message password protected.  In order for the receiver to view the 
            message they will need to enter this password.  It will be up to you to determine how you will get this password
            to them so they can access your message's contents.
        </slide>
        <!-- might want to add some kind of styled spacer right here -->
        <slide>
            <img src="../assets/PasswordDomainOnboard.png" width="400">
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
        text-align: center;
        line-height: 2;
    }
</style>