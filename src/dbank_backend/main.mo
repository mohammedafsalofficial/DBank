import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  currentValue := 100;

  stable var startTime: Int = Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withDrawl(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Amount too large, currentValue less than zero");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime: Int = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedM = timeElapsedNS / 60000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedM));
    startTime := currentTime;
  }
}
