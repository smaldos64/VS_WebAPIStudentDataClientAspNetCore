enum CourseOperation_ENUM {
    Save_Course_Data,
    Edit_Course_Data
}

class Course {
    public CourseID: number;
    public CourseName: string;

    constructor(CourseID: number, CourseName: string) {
        this.CourseID = CourseID;
        this.CourseName = CourseName;
    }

    public list(): void {
        console.log("Kursus i Databasen :");
        console.log("Kursus ID : " + this.CourseID);
        console.log("Kursus Navn : " + this.CourseName);
    }

    public toString = (): string => {
        return `(${this.CourseID + " / " + this.CourseName})`;
    }
}

class ReturnCodeAndReturnStringFromWEBApi {
    public ReturnCode: number;
    public ReturnCodeString: string;

    constructor(ReturnCode: number, ReturnCodeString: string) {
        this.ReturnCode = ReturnCode;
        this.ReturnCodeString = ReturnCodeString;
    }

    public toString = (): string => {
        return `(${this.ReturnCode + " " + this.ReturnCodeString})`;
    }
}