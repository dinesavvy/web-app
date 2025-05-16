import React, { useEffect, useState } from "react";
import { createVersionAction, createVersionHandler } from "../../../../redux/action/createVersion";
import Loader from "../../../../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useCommonMessage } from "../../../../common/CommonMessage";

const SettingsList = () => {
  const [environment, setEnvironment] = useState("Stage");
  const [application, setApplication] = useState("Customer");
  const [ios, setIos] = useState({ version: "", build: "", minForce: "" });
  const [android, setAndroid] = useState({
    version: "",
    build: "",
    minForce: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const selectVersion = useSelector((state) => state.createVersion);

  const handleChange = (platform, field, value) => {
    if (platform === "ios") {
      setIos({ ...ios, [field]: value });
    } else {
      setAndroid({ ...android, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ios: {
        minVersion: ios.minForce,
        minBuildVersion: ios.build,
        currentVersion: ios.version,
        currentBuildVersion: ios.build,
      },
      android: {
        minVersion: android.minForce,
        minBuildVersion: android.build,
        currentVersion: android.version,
        currentBuildVersion: android.build,
      },
      appType: application,
      message: message.trim(),
    };

    dispatch(createVersionHandler(payload));
  };
  const messageApi = useCommonMessage();

  useEffect(() => {
    if (selectVersion?.data?.statusCode === 200) {
      messageApi.open({
        type: "success",
        content: selectVersion?.data?.message,
      });
      dispatch(createVersionAction.createVersionReset());
    }else if(selectVersion?.message){
      messageApi.open({
        type: "error",
        content: selectVersion?.message,
      });
      dispatch(createVersionAction.createVersionReset());
    }
  }, [selectVersion]);

  return (
    <>
      {selectVersion?.isLoading && <Loader />}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 36,
          margin: 24,
        }}
      >
        <h2 style={{ marginBottom: 24, fontWeight: 700 }}>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 24,
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <label style={{ fontWeight: 500, marginBottom: 4 }}>
                Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                style={{
                  width: 220,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  fontSize: 17,
                }}
              >
                <option value="Stage">Stage</option>
                <option value="Production">Production</option>
              </select>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <label style={{ fontWeight: 500, marginBottom: 4 }}>
                Application
              </label>
              <select
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                style={{
                  width: 320,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  fontSize: 17,
                }}
              >
                <option value="Customer">Customer</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
          <hr
            style={{
              margin: "24px 0 24px 0",
              border: "none",
              borderTop: "2px solid #eee",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 0,
              marginBottom: 24,
            }}
          >
            {/* iOS Column */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 32,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>IOS version:</span>
                <input
                  type="text"
                  value={ios.version}
                  onChange={(e) =>
                    handleChange("ios", "version", e.target.value)
                  }
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>Build Version:</span>
                <input
                  type="text"
                  value={ios.build}
                  onChange={(e) => handleChange("ios", "build", e.target.value)}
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>Min Force Version:</span>
                <input
                  type="text"
                  value={ios.minForce}
                  onChange={(e) =>
                    handleChange("ios", "minForce", e.target.value)
                  }
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
            </div>
            {/* Divider */}
            <div
              style={{
                width: 1,
                background: "#e5e5e5",
                margin: "0 32px",
                height: 140,
                alignSelf: "center",
              }}
            />
            {/* Android Column */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 32,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>Android version:</span>
                <input
                  type="text"
                  value={android.version}
                  onChange={(e) =>
                    handleChange("android", "version", e.target.value)
                  }
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>Build Version:</span>
                <input
                  type="text"
                  value={android.build}
                  onChange={(e) =>
                    handleChange("android", "build", e.target.value)
                  }
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 17 }}>Min Force Version:</span>
                <input
                  type="text"
                  value={android.minForce}
                  onChange={(e) =>
                    handleChange("android", "minForce", e.target.value)
                  }
                  style={{
                    width: 70,
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    fontSize: 17,
                    marginLeft: 24,
                  }}
                />
              </div>
            </div>
          </div>
          <hr
            style={{
              margin: "24px 0",
              border: "none",
              borderTop: "2px solid #eee",
            }}
          />
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 500, fontSize: 17 }}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Text Input"
              style={{
                width: "100%",
                minHeight: 180,
                borderRadius: 6,
                border: "1px solid #aaa",
                padding: 8,
                fontFamily: "inherit",
                fontSize: 16,
                marginTop: 8,
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <button type="submit" className="btn w240">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingsList;
