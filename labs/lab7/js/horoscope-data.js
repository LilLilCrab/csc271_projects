var horoscopDescriptions = [
    "Today is a day for new beginnings. Embrace change and seize opportunities.",
    "Your determination will lead to success today. Stay focused on your goals.",
    "Communication is key today. Express yourself clearly and listen to others.",
    "Trust your intuition. It will guide you in making the right decisions.",
    "Your creativity shines today. Use it to inspire and lead others.",
    "Pay attention to the details. Your meticulous work will pay off.",
    "Balance is essential. Find harmony in all aspects of your life.",
    "Embrance transformation. Let go of what no longer serves you.",
    "Adventure awaits. Explore new horizons and expand your goals.",
    "Hard work leads to success. Keep pushing toward you goals.",
    "Your unique perspective is an asset. Share your ideas with others.",
    "Trust your emotions. They will guide you in making the right choices."
];

var zodiacSigns = ["Aquarius", "Leo", "Libra", "Aries", "Taurus", "Gemini", "Cancer", "Virgo", "Scorpio", "Sagittarius", "Capricorn"];
var ourSigns = [zodiacSigns[0], zodiacSigns[1], zodiacSigns[2]]; // Aquarius, Leo, Libra
var myZodiacSign = zodiacSigns[2]; // Libra is the third sign in the zodiacSigns array
var angelsZodiacSign = zodiacSigns[1]; // Leo is the second sign in the zodiacSigns array
var nehemiahsZodiacSign = zodiacSigns[0]; // Aquarius is the first sign in the zodiacSigns array

var birthMonth = "October";
var birthDay = 5;
var luckyNumber = 18.789;
var beliefInAstrology = true;
var moodRatingLibra = 4.25;
var moodRatingLeo = 3.4;
var moodRatingAquarius = 4.3;

var horoscopeDescription = "I am a Libra. " + horoscopDescriptions[6];
var myHoroscopeDescription = "I am a Libra. " + horoscopDescriptions[10];
var angelsHoroscopeDescription = "Angel is  a Leo. " + horoscopDescriptions[1];
var nehemiahsHoroscopeDescription = "Nehemiah is an Aquarius. " + horoscopDescriptions[4];




document.getElementById("sign").innerHTML = "My sign is: " + myZodiacSign + "<br>";
document.getElementsByClassName("birthday")[0].innerHTML = "Birthday: " + birthMonth + " " + birthDay + "th";
document.getElementsByClassName("luckyNum")[0].innerHTML = "Lucky Number: " + luckyNumber;
var paragraphs = document.querySelectorAll("p"); // Grab and store all paragraphs
paragraphs[0].innerHTML = horoscopeDescription; // Update first occurring paragraph
paragraphs[1].innerHTML = "Do I believe in astrology? " + beliefInAstrology; // Update second occurring paragraph
paragraphs[1].style.fontWeight = "bold"; // Perform formatting on second paragraph

var libraMood = document.getElementById("mood-libra");
libraMood.style.fontWeight = "bold"; // Format mood rating for Libra
libraMood.innerHTML = moodRatingLibra; // Display mood rating for Libra

var avgMood = document.getElementById("avg-mood");
avgMood.style.fontWeight = "bold"; // Format average mood rating
avgMood.innerHTML = Math.trunc((moodRatingAquarius + moodRatingLeo + moodRatingLibra) / 3); // Calculate and display average mood rating

paragraphs[3].innerHTML = "My zodiac sign is: " + myZodiacSign + "\n" + myHoroscopeDescription; // Update fourth occurring paragraph
paragraphs[4].innerHTML = "Angel's zodiac sign is: " + angelsZodiacSign + "\n" + angelsHoroscopeDescription; // Update fifth occurring paragraph
paragraphs[5].innerHTML = "Nehemiah's zodiac sign is: " + nehemiahsZodiacSign + "\n" + nehemiahsHoroscopeDescription; // Update sixth occurring paragraph