import java.io.*;
import java.lang.*;

public class Sample{
public static void main(String args[]){
  SayHi();
}
public string SayHi()
{
    string fileName = HostingEnvironment.MapPath("./") + "\\" + "emotion.py";

    Process p = new Process();
    p.StartInfo = new ProcessStartInfo(@"C:\\Program Files\\Python37\\python.exe", fileName)
    {
        RedirectStandardOutput = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };
    p.Start();

    return p.StandardOutput.ReadToEnd();
}
}
