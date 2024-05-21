import { respData, respErr } from "@/lib/resp";

import { Cover } from "@/types/cover";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { currentUser } from "@clerk/nextjs";
import { downloadAndUploadImage } from "@/lib/s3";
import { genUuid } from "@/lib";
import { getOpenAIClient } from "@/services/openai";
import { getUserCredits } from "@/services/order";
import { insertCover } from "@/models/cover";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Word } from "@/types/word";
import { insertWord } from "@/models/word";


export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  try {
    const { words } = await req.json();
    if (!words) {
      return respErr("invalid params");
    }

    const user_email = user.emailAddresses[0].emailAddress;

    const user_credits = await getUserCredits(user_email);
    if (!user_credits || user_credits.left_credits < 1) {
      //return respErr("credits not enough");
    }

    const client = getOpenAIClient();

    const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");

    // const completion = await client.chat.completions.create({
    //   model: 'gpt-3.5-turbo-0125',
    //   messages: [{ role: 'user', content: `I have 100 classifications of English vocabulary separated by captions, Daily Expressions;Pronouns;Verbs;Adjectives;Numbers;Time Expressions;Seasons and Months;Colors;Body Parts;Family Relationships;Animals;Plants;Food;Beverages;Fruits;Vegetables;Work;Learning;Transportation;Housing;Furniture;Appliances;Clothing;Shoes;Accessories;Cosmetics;Physical Health;Illnesses;Medical Care;Mental Health;Sports;Games;Entertainment;Movies;Music;Books;Arts;Literature;History;Geography;Politics;Economics;Society;Science;Technology;Environment;Natural Disasters;Weather;Universe;Religion;Culture;Language;Education;Occupations;Business;Finance;Law;Government;Military;Socializing;Interpersonal Relationships;Community;Charity;Volunteering;Travel;Landmarks;Tourist Attractions;Folklore;Traditions;Holidays;Weddings;Funerals;Etiquette;Gifts;Shopping;Stores;Markets;Finance;Investment;Loans;Taxes;Insurance;Career Development;Recruitment;Workplace;Professionalism;Entrepreneurship;Business Travel;Meetings;Exhibitions;Teamwork;Leadership;Communication Skills;Time Management;Project Management;Creativity;Innovation;Problem Solving;Decision Making;Success;Principles, just tell me what the category name of  the word ${word}, do not provide redundant descriptions` }],
    //   response_format: { type: "json_object" },
    // }, {httpAgent:proxyAgent});

    const completion = await client.chat.completions.create({
      messages: [
        {role: "user", content: "I have 100 classifications of English vocabularies."},
        {role: "user", content: "Daily Expressions"},
        {role: "user", content: "Pronouns"},
        {role: "user", content: "Verbs"},
        {role: "user", content: "Adjectives"},
        {role: "user", content: "Numbers"},
        {role: "user", content: "Time Expressions"},
        {role: "user", content: "Seasons and Months"},
        {role: "user", content: "Colors"},
        {role: "user", content: "Body Parts"},
        {role: "user", content: "Family Relationships"},
        {role: "user", content: "Animals"},
        {role: "user", content: "Plants"},
        {role: "user", content: "Food"},
        {role: "user", content: "Beverages"},
        {role: "user", content: "Fruits"},
        {role: "user", content: "Vegetables"},
        {role: "user", content: "Work"},
        {role: "user", content: "Learning"},
        {role: "user", content: "Transportation"},
        {role: "user", content: "Housing"},
        {role: "user", content: "Furniture"},
        {role: "user", content: "Appliances"},
        {role: "user", content: "Clothing"},
        {role: "user", content: "Shoes"},
        {role: "user", content: "Accessories"},
        {role: "user", content: "Cosmetics"},
        {role: "user", content: "Physical Health"},
        {role: "user", content: "Illnesses"},
        {role: "user", content: "Medical Care"},
        {role: "user", content: "Mental Health"},
        {role: "user", content: "Sports"},
        {role: "user", content: "Games"},
        {role: "user", content: "Entertainment"},
        {role: "user", content: "Movies"},
        {role: "user", content: "Music"},
        {role: "user", content: "Books"},
        {role: "user", content: "Arts"},
        {role: "user", content: "Literature"},
        {role: "user", content: "History"},
        {role: "user", content: "Geography"},
        {role: "user", content: "Politics"},
        {role: "user", content: "Economics"},
        {role: "user", content: "Society"},
        {role: "user", content: "Science"},
        {role: "user", content: "Technology"},
        {role: "user", content: "Environment"},
        {role: "user", content: "Natural Disasters"},
        {role: "user", content: "Weather"},
        {role: "user", content: "Universe"},
        {role: "user", content: "Religion"},
        {role: "user", content: "Culture"},
        {role: "user", content: "Language"},
        {role: "user", content: "Education"},
        {role: "user", content: "Occupations"},
        {role: "user", content: "Business"},
        {role: "user", content: "Finance"},
        {role: "user", content: "Law"},
        {role: "user", content: "Government"},
        {role: "user", content: "Military"},
        {role: "user", content: "Socializing"},
        {role: "user", content: "Interpersonal Relationships"},
        {role: "user", content: "Community"},
        {role: "user", content: "Charity"},
        {role: "user", content: "Volunteering"},
        {role: "user", content: "Travel"},
        {role: "user", content: "Landmarks"},
        {role: "user", content: "Tourist Attractions"},
        {role: "user", content: "Folklore"},
        {role: "user", content: "Traditions"},
        {role: "user", content: "Holidays"},
        {role: "user", content: "Weddings"},
        {role: "user", content: "Funerals"},
        {role: "user", content: "Etiquette"},
        {role: "user", content: "Gifts"},
        {role: "user", content: "Shopping"},
        {role: "user", content: "Stores"},
        {role: "user", content: "Markets"},
        {role: "user", content: "Finance"},
        {role: "user", content: "Investment"},
        {role: "user", content: "Loans"},
        {role: "user", content: "Taxes"},
        {role: "user", content: "Insurance"},
        {role: "user", content: "Career Development"},
        {role: "user", content: "Recruitment"},
        {role: "user", content: "Workplace"},
        {role: "user", content: "Professionalism"},
        {role: "user", content: "Entrepreneurship"},
        {role: "user", content: "Business Travel"},
        {role: "user", content: "Meetings"},
        {role: "user", content: "Exhibitions"},
        {role: "user", content: "Teamwork"},
        {role: "user", content: "Leadership"},
        {role: "user", content: "Communication Skills"},
        {role: "user", content: "Time Management"},
        {role: "user", content: "Project Management"},
        {role: "user", content: "Creativity"},
        {role: "user", content: "Innovation"},
        {role: "user", content: "Problem Solving"},
        {role: "user", content: "Decision Making"},
        {role: "user", content: "Success"},
        {role: "user", content: "Principles"},
        {role: "user", content: `Please return me a JSON data, where key is 'result' and value is the category name of the word '${words}`},
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    }, {httpAgent:proxyAgent});

    const res = JSON.parse(completion.choices[0].message.content || '');
    const word : Word  = {
      email: user_email,
      word: words,
      status: 1,
      word_category: res.result,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await insertWord(word);
    return respData(word);
  } catch (e) {
    console.log("gen cover failed: ", e);
    return respErr("gen cover failed");
  }
}
