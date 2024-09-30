const connToken = "90931973|-31949226448660709|90962478"; // Common variable for the token

$("#rollNo").focus();

function validateAndGetFormData() {
    const fields = ["rollNo", "fullName", "class", "birthDate", "address", "enrollmentDate"];
    for (let field of fields) {
        const value = $("#" + field).val();
        if (value === "") {
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is Required`);
            $("#" + field).focus();
            return "";
        }
    }

    const jsonStrObj = {
        rollNo: $("#rollNo").val(),
        fullName: $("#fullName").val(),
        class: $("#class").val(),
        birthDate: $("#birthDate").val(),
        address: $("#address").val(),
        enrollmentDate: $("#enrollmentDate").val(),
    };
    return JSON.stringify(jsonStrObj);
}

function createPUTRequest(connToken, jsonObj, dbName, relName) {
    return `{
        "token": "${connToken}",
        "dbName": "${dbName}",
        "cmd": "PUT",
        "rel": "${relName}",
        "jsonStr": ${jsonObj}
    }`;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    const url = dbBaseUrl + apiEndPointUrl;
    let jsonObj;

    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        jsonObj = JSON.parse(result.responseText);
    });
    
    return jsonObj;
}

function resetForm() {
    $("#studentForm")[0].reset();
    $("#rollNo").focus();
    $("#save").prop("disabled", false);
    $("#update").prop("disabled", true);
}

function saveStudent() {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    const putReqStr = createPUTRequest(connToken, jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    const resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
}

function updateStudent() {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    const putReqStr = createPUTRequest(connToken, jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    const resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
}
