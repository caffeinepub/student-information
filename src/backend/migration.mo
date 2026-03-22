import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {
  // Legacy type without email.
  type OldStudentRecord = {
    rollNumber : Text;
    collegeName : Text;
    courseDetails : Text;
    address : Text;
    phoneNumber : Text;
    timestamp : Time.Time;
  };

  // Old state.
  type OldActor = {
    records : Map.Map<Text, OldStudentRecord>;
  };

  // New type with email.
  type NewStudentRecord = {
    rollNumber : Text;
    collegeName : Text;
    courseDetails : Text;
    address : Text;
    phoneNumber : Text;
    studentEmail : Text;
    timestamp : Time.Time;
  };

  // New state.
  type NewActor = {
    records : Map.Map<Text, NewStudentRecord>;
  };

  // Add empty email to legacy records.
  public func run(old : OldActor) : NewActor {
    let newRecords = old.records.map<Text, OldStudentRecord, NewStudentRecord>(
      func(_rollNumber, oldRecord) {
        { oldRecord with studentEmail = "" };
      },
    );
    { records = newRecords };
  };
};
