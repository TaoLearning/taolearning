<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="college, campus, university, courses, school, educational">
    <meta name="description" content="Tao Learning">
    <meta name="author" content="Tao Fuit">
    <title>Tao Learning</title>

    <!-- Favicons-->
    <link rel="shortcut icon" href="img/favico.png" type="image/x-icon">
    <link rel="apple-touch-icon" type="image/x-icon" href="img/apple-touch-icon-57x57-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="img/apple-touch-icon-72x72-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="img/apple-touch-icon-114x114-precomposed.png">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="img/apple-touch-icon-144x144-precomposed.png">

    <!-- BASE CSS -->
    <link href="css/main_font/main_font.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/menu.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/responsive.css" rel="stylesheet">
    <link href="css/elegant_font/elegant_font.min.css" rel="stylesheet">
    <link href="css/icon_font/pe-icon-7-stroke.min.css" rel="stylesheet">
    <link href="css/fontello/css/fontello.min.css" rel="stylesheet">
    <link href="css/edu_fonts/edu_fonts.min.css" rel="stylesheet">
    <link href="css/magnific-popup.css" rel="stylesheet">

    <!-- YOUR CUSTOM CSS -->
    <link href="css/custom.css" rel="stylesheet">

    <style>
	body {
		background-color:#283842; 
		color:#fff !important;
	}
		#mask {
		position: fixed;
		top:0;
		left:0;
		right:0;
		width:100%;
		height:100%;
		bottom:0;
		background-color:#283842; 
		z-index:999999;
		color:#fff !important;
	}
	.mask_content {
	  margin:-125px 0 0 -140px; 
	  position:absolute;
	  left:50%; 
	  top:50%;
	  width: 280px;
	  height: 250px;
	  text-align: center;
	 }
	</style>

<script type="text/javascript">
function delayedRedirect(){
    window.location = "index.html"
}
</script>

</head>
<body onLoad="setTimeout('delayedRedirect()', 10000)">
<?php
						$mail = $_POST['email_apply'];

						/*$subject = "".$_POST['subject'];*/
						$to = "your@email.com";
						$subject = "Apply from Tao";
						$headers = "From: Tao web site <noreply@yourdomain.com>";
						
						$message = "\nPERSONAL DETAILS"; 
						$message .= "\nName: " . $_POST['name_apply'];
						$message .= "\nLast name: " . $_POST['lastname_apply'];
						$message .= "\nEmail: " . $_POST['email_apply'];
						$message .= "\nTelephone: " . $_POST['phone_apply'];
						$message .= "\nDate of birth: " . $_POST['birth_apply'];
						$message .= "\nGender: " . $_POST['gender_apply'];
						
						$message .= "\n\nADDRESS"; 
						$message .= "\nAddress line: " . $_POST['address_apply'];
						$message .= "\nCity: " . $_POST['town_apply'];
						$message .= "\nCountry: " . $_POST['country_apply'];
						$message .= "\nPostal code: " . $_POST['postal_code_apply'];
						
						$message .= "\n\nCOURSE PREFERENCES\n"; 
						foreach($_POST['apply_course'] as $value) 
							{ 
							$message .=   "- " .  trim(stripslashes($value)) . "\n"; 
							};
						
						$message .= "\nTerms and conditions accepted: " . $_POST['policy_terms'] . "\n";
						
						//Receive Variable
						$sentOk = mail($to,$subject,$message,$headers);
						
						//Confirmation page
						$user = "$mail";
						$usersubject = "Thank You";
						$userheaders = "From: info@Tao.com\n";
						/*$usermessage = "Thank you for your time. Your request is successfully submitted.\n"; WITH OUT SUMMARY*/
						//Confirmation page WITH  SUMMARY
						$usermessage = "Thank you for your time. Your request is successfully submitted.\n\nSUMMARY\n$message"; 
						mail($user,$usersubject,$usermessage,$userheaders);
	
?>

<!-- END SEND MAIL SCRIPT -->   
<div id="mask">
<div class="mask_content">
 <p class="text-center" style="font-size:80px;"><i class="icon_check_alt2"></i></p>
  <h4 style="color:#FFC">Thank you!<br>Your request has been sent.</h4>
 <p>You will be redirect back in 10 seconds.</p>
</div>
</div>
</body>
</html>