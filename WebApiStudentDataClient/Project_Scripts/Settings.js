const WebApiTechnology = {
    Asp_Net: 1,
    Asp_Net_Core: 2
};
Object.freeze(WebApiTechnology);

// FrameWorkSelector variablen herunder bruges til at bestemme, om der arbejdes op imod
// det gamle Web Api udviklet i Asp.Net Framework eller op imod det nye Web Api udviklet
// i Asp.Net Core Framework. Der er desværre bogle ting, der ikke er helt ens i de 2 
// nævnte teknologier. så derfor er det nødvendig med varaiblen her til at styre rundt omkring
// i programkoden, hvilken af de 2 teknologier, der arbejdes op imod. 
const FrameWorkSelector = WebApiTechnology.Asp_Net_Core;

var WEB_API_URL_StudentData;

// Asp.Net Web Api herunder. Vælg én af de angivne URL's her, hvis du arbejder op imod det gamle
// Web API udviklet i Asp.Net Framework.

if (FrameWorkSelector == WebApiTechnology.Asp_Net) {
    //WEB_API_URL_StudentData = "http://localhost:62090/api/";

    //WEB_API_URL_StudentData = "http://webapistudentdata.buchwaldshave34.dk/api/";

    WEB_API_URL_StudentData = "https://webapistudentdata.buchwaldshave34.dk/api/";
}

// Asp.Net Core Web API herunder. Vælg én af de angivne URL's her, hvis du arbejder op imod det nye
// Web API udviklet i Asp.Net Core Framework.

if (FrameWorkSelector == WebApiTechnology.Asp_Net_Core) {
    //WEB_API_URL_StudentData = "https://localhost:44379/api/";

    //WEB_API_URL_StudentData = "http://localhost:52525/api/";

    //WEB_API_URL_StudentData = "http://webapistudentdatanetcore.buchwaldshave34.dk/api/";

    WEB_API_URL_StudentData = "https://webapistudentdatanetcore.buchwaldshave34.dk/api/";
}

// Herunder opsættes stien til alle de Controolers i Web Api'et, ,an skal bruge. Læg mærke
// til at alting sættes op releativt til WEB_API_URL_StudentData varialen defineret herover.
// På denne måde skal vi kun ændre ét sted (nemlig i variablen WEB_API_URL_StudentData), uanset
// hvilket Web Api vi kommunikerer op imod. Dette kræver selvfølgelig, at Controlller navne
// er de samme i de 2 Web Api, der kan kommunikeres op imod !!!
const WEB_API_URL_StudentData_Course = WEB_API_URL_StudentData + "Course";
const WEB_API_URL_StudentData_Eductaion = WEB_API_URL_StudentData + "Education";
const WEP_API_URL_USERINFO = WEB_API_URL_StudentData + "UserInfo";
const WEB_API_URL_RETURN_CODES_AND_RETURN_STRINGS = WEB_API_URL_StudentData + "ReturnCodesAndStrings";
const WEB_API_URL_LOGDATA = WEB_API_URL_StudentData + "LogData";

const WEB_API_URL_StudentData_EducationLine = WEB_API_URL_StudentData + "EducationLine";
const WEB_API_URL_StudentData_ContactForm = WEB_API_URL_StudentData + "ContactForm";

const UserName = "Lars-Lærer";
const Password = "smal";

const jSonDecodingError = -100;
const jSonDecodingOk = 0;
const OperationOkHigherValueThanHere = 0;

var ReturnCodeAndReturnStringFromWEBApiList = [];

function TrimReturnString(ReturnString) {
    var OutString = ReturnString.toString();
    
    var Position = OutString.indexOf(" ");

    if (Position > 0) {
        OutString = OutString.substring(0, Position - 1);
    }

    try {
        OutInt = parseInt(OutString);
        return OutInt;
        // Vi skulle gerne kunne returnere et "rent" tal !!!
    }
    catch (Exception) {
        return ReturnString;
    }

    return (ReturnString);
}

function FindReturnNumberString(ReturnList, ReturnNumber) {
    ReturnNumberCounter = 0;

    do {
        if (ReturnList[ReturnNumberCounter].ReturnCode == ReturnNumber) {
            return (ReturnList[ReturnNumberCounter].ReturnCodeString);
        }
        else {
            ReturnNumberCounter++;
        }
    } while (ReturnNumberCounter < ReturnList.length);
    return ("Fejl nummer ikke fundet !!!");
}

function Deserialize_jSOnData(data) {
    try {
        jSonDataDeserialized = JSON.parse(data);
    }
    catch (Exception) {
        try {
            jSonDataDeserialized = JSON.parse(JSON.stringify(data));
        }
        catch (Exception) {
            try {
                jSonDataDeserialized = data;
            }
            catch (Exception) {
                alert(Exception);
                jSonDataDeserialized = jSonDecodingError;
            }
        }
    }
    return (jSonDataDeserialized);
}

function GetReturnNumbersAndReturnStringFromWebAPI() {
    var ReturnCode = jSonDecodingError;

    $.ajaxSetup({ async: false });
    // Vi vil ikke returnere fra funktionen før vores Ajax kald er blevet processeret !!!

    $.ajax({
        url: WEB_API_URL_RETURN_CODES_AND_RETURN_STRINGS,
        type: 'GET',
        dataType: "json",
        headers: {
            accept: "application/json",
        },
        success: function (data) {
            //On ajax success do this
            DecodejSONReturnCodesAndReturnStrings(data);
            ReturnCode = jSonDecodingOk;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //On ajax error do this
            alert(xhr.status);
            alert(ajaxOptions);
            alert(thrownError);
        }
    });

    $.ajaxSetup({ async: true });
    return (ReturnCode);
}

function DecodejSONReturnCodesAndReturnStrings(jSonData) {
    ReturnCodeAndReturnStringFromWEBApiList.splice(0, ReturnCodeAndReturnStringFromWEBApiList.length);
    $.each(jSonData, function (key, item) {
        if (FrameWorkSelector == WebApiTechnology.Asp_Net) {
            ReturnCodeAndReturnStringFromWEBApiList.push(new ReturnCodeAndReturnStringFromWEBApi(item.ReturnCode, item.ReturnString));
        }

        if (FrameWorkSelector == WebApiTechnology.Asp_Net_Core) {
            ReturnCodeAndReturnStringFromWEBApiList.push(new ReturnCodeAndReturnStringFromWEBApi(item.returnCode, item.returnString));
        }
        //ReturnCodeAndReturnStringFromWEBApiList.push(new ReturnCodeAndReturnStringFromWEBApi(item.ReturnCode, item.ReturnString));
        // Brug syntaksen herover, hvis du kommunikerer op imod det "gamle" Asp.Net Framework Web API.
        //ReturnCodeAndReturnStringFromWEBApiList.push(new ReturnCodeAndReturnStringFromWEBApi(item.returnCode, item.returnString));
        // Brug syntaksen herover, hvis du kommunikerer op imod det "nye" Asp.Net.Core Web API.
    });
}