var CourseOperation_ENUM;
(function (CourseOperation_ENUM) {
    CourseOperation_ENUM[CourseOperation_ENUM["Save_Course_Data"] = 0] = "Save_Course_Data";
    CourseOperation_ENUM[CourseOperation_ENUM["Edit_Course_Data"] = 1] = "Edit_Course_Data";
})(CourseOperation_ENUM || (CourseOperation_ENUM = {}));
var Course = /** @class */ (function () {
    function Course(CourseID, CourseName) {
        var _this = this;
        this.toString = function () {
            return "(" + (_this.CourseID + " / " + _this.CourseName) + ")";
        };
        this.CourseID = CourseID;
        this.CourseName = CourseName;
    }
    Course.prototype.list = function () {
        console.log("Kursus i Databasen :");
        console.log("Kursus ID : " + this.CourseID);
        console.log("Kursus Navn : " + this.CourseName);
    };
    return Course;
}());
var ReturnCodeAndReturnStringFromWEBApi = /** @class */ (function () {
    function ReturnCodeAndReturnStringFromWEBApi(ReturnCode, ReturnCodeString) {
        var _this = this;
        this.toString = function () {
            return "(" + (_this.ReturnCode + " " + _this.ReturnCodeString) + ")";
        };
        this.ReturnCode = ReturnCode;
        this.ReturnCodeString = ReturnCodeString;
    }
    return ReturnCodeAndReturnStringFromWEBApi;
}());
//# sourceMappingURL=TypeScriptStuff.js.map