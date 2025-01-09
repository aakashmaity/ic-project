import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  var currentVal: Float = 100;
  var startTime = Time.now();
  Debug.print(debug_show(startTime));

  public func greet(){
    Debug.print(" DBank Welcomes you");
  };

  public func deposit(amount: Float){
    currentVal += amount;
    Debug.print(debug_show(currentVal));
  };

  public func withdraw(amount: Float){
    let tempVal : Float = currentVal - amount;
    if(tempVal >= 0){
      currentVal -= amount;
      Debug.print(debug_show(currentVal));
    }else{
      Debug.print("Insufficient balance");
    };
  };

  public query func checkBalance(): async Float {
    return currentVal;
  };

  public func compoundInterest(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime; // in NanoSeconds
    let timeElapsedS = timeElapsedNS / (1000000000); // in seconds
    // Debug.print(debug_show(timeElapsedS));

    currentVal := currentVal * ( 1.01 ** Float.fromInt(timeElapsedS));
    Debug.print(debug_show(currentVal));

    startTime := currentTime;
  };

};
