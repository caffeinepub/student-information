import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";

actor {
  type StudentRecord = {
    rollNumber : Text;
    collegeName : Text;
    address : Text;
    phoneNumber : Text;
    timestamp : Time.Time;
  };

  module StudentRecord {
    public func compare(record1 : StudentRecord, record2 : StudentRecord) : Order.Order {
      rollNumberCompare(record1.rollNumber, record2.rollNumber);
    };

    func rollNumberCompare(text1 : Text, text2 : Text) : Order.Order {
      switch (Text.compare(text1, text2)) {
        case (#equal) { Text.compare(text1, text2) };
        case (order) { order };
      };
    };
  };

  let records = Map.empty<Text, StudentRecord>();

  public shared ({ caller }) func submitRecord(rollNumber : Text, collegeName : Text, address : Text, phoneNumber : Text) : async () {
    let record : StudentRecord = {
      rollNumber;
      collegeName;
      address;
      phoneNumber;
      timestamp = Time.now();
    };
    records.add(rollNumber, record);
  };

  public query ({ caller }) func getAllRecords() : async [StudentRecord] {
    records.values().toArray().sort();
  };
};
