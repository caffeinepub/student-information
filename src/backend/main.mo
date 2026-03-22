import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  type StudentRecord = {
    rollNumber : Text;
    collegeName : Text;
    courseDetails : Text;
    address : Text;
    phoneNumber : Text;
    studentEmail : Text;
    timestamp : Time.Time;
  };

  module StudentRecord {
    public func compare(a : StudentRecord, b : StudentRecord) : Order.Order {
      Text.compare(a.rollNumber, b.rollNumber);
    };
  };

  let records = Map.empty<Text, StudentRecord>();

  public shared ({ caller }) func submitRecord(
    rollNumber : Text,
    collegeName : Text,
    courseDetails : Text,
    address : Text,
    phoneNumber : Text,
    studentEmail : Text,
  ) : async () {
    let record : StudentRecord = {
      rollNumber;
      collegeName;
      courseDetails;
      address;
      phoneNumber;
      studentEmail;
      timestamp = Time.now();
    };
    records.add(rollNumber, record);
  };

  public query ({ caller }) func getAllRecords() : async [StudentRecord] {
    records.values().toArray().sort();
  };
};
