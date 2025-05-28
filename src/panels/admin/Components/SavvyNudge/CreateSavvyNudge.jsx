import React, { useEffect, useState } from "react";
import backButton from "../../../../assets/images/backButton.svg";
import selectedImage from "../../../../assets/images/selectedImage.svg";
import calender from "../../../../assets/images/calender.svg";
import closeRightSidebar from "../../../../assets/images/closeRightSidebar.svg";
import dish2 from "../../../../assets/images/dish2.png";
import { DatePicker } from "antd";
import addPlusIcon from "../../../../assets/images/addPlusIcon.svg";
import merchantMilesSelected from "../../../../assets/images/merchantMilesSelected.svg";
import playbtn from "../../../../assets/images/playbtn.svg";
import { Modal } from "antd";
import dayjs from "dayjs";
import CustomSelect from "../CustomSelect";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../SearchSelect";
import SavvyNudgeDetail from "./SavvyNudgeDetail";
import MerchantViewAll from "./MerchantViewAll";

const CreateSavvyNudge = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectMerchantList, setSelectMerchantList] = useState(false);
  const todayPlus3 = dayjs().add(3, "day").startOf("day");

  const handleKeyPress = (e) => {
    const regex = /[0-9/]/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Disable dates before today + 3 days
  const disableBeforeThreeDays = (current) => {
    return current && current < todayPlus3;
  };
  // Array of objects with image and name
  const images = [
    { src: dish2, name: "Pairing" },
    { src: dish2, name: "Destination" },
  ];

  // Video
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
 
  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setYoutubeUrl(value);
    const id = extractVideoId(value);
    setVideoId(id);
  };

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";

  const embeddedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  const options = ["25", "50", "100", "250", "National"];
  const [selected, setSelected] = useState("25");

  return (
    <>
      <div className="dashboard">
        <div className="tabPadding mb-20">
          <div className="d-flex align-center gap-20 w-100">
            <img
              src={backButton}
              alt="backButton"
              className="cursor-pointer backButton"
              onClick={() => navigate("/admin/savvy-nudge")}
            />
            <div>
              <div className="fs-24 fw-600">Savvy Nudge Template</div>
            </div>
          </div>
          <div className="divider2"></div>
          <div className="savvyGrid">
            {images.map((item, index) => (
              <div
                key={index}
                className={`savvyImageSelect ${
                  selectedIndex === index ? "selectedBorder" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="gradiant"></div>
                <div className="fs-18 fw-600 savvyname">{item.name}</div>
                <img
                  src={item.src}
                  alt={`Dish ${index}`}
                  className="w-100 h-100"
                />
                {selectedIndex === index && (
                  <div className="selectedImage">
                    <img src={selectedImage} alt="Selected" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-24 fw-600">Enter the Details</div>
          <div className="divider2"></div>
          <div className="savvyInputGrid gap-20">
            <div className="threeSpace">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Title
              </label>
              <input
                type="text"
                className="input"
                placeholder="Free appetizer"
              />
            </div>
            <div className="threeSpace position-relative">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Description
              </label>
              <textarea placeholder="Free appetizer on Happy Hours! From 07:00 PM to 08:00 PM"></textarea>
              <div className="fs-12 textWord">110/750</div>
            </div>
            <div className=" position-relative">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Savvy Nudge Launch Date
              </label>

              <DatePicker
                needConfirm
                placeholder="Set merchant availability period "
                suffixIcon={<img src={calender} className="calenderIcon" alt="" />}
                format="DD/MM/YYYY"
                allowClear={false}
                className="w-100 datePickerinput"
                disabledDate={disableBeforeThreeDays}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className=" position-relative">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Savvy Nudge Duration
              </label>

              <CustomSelect />
            </div>
            <div className="">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Audience Targeting (Optional)
              </label>
              <input
                type="text"
                className="input"
                placeholder="Define target audience"
              />
            </div>
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-24 fw-600">Nudges Creation</div>
          <div className="divider2"></div>
          <div className="inputGrid gap-20">
            <div className="">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Youtube Video Link
              </label>
              <input
                type="text"
                className="input"
                placeholder="https://www.youtube.com/embed/tgbNymZ7vqY"
                value={youtubeUrl}
                onChange={handleUrlChange}
              />
            </div>
            {videoId && (
              <div>
                <label className="mb-10 fs-16 fw-500">Video</label>
                <div
                  className="text-center videoThumbnail"
                  onClick={() => setActiveVideoUrl(embeddedUrl)}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <img
                    src={playbtn}
                    className="playbtn"
                    alt="Play"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    className="w-100 h-100"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-20 fw-700 mb-10">Merchant</div>
          <div className="d-flex flex-wrap mb-20 align-center gap-10">
            <div className="merchantSelectList fs-14">Starbucks</div>
            <div
              className="merchantAddList fs-14 cursor-pointer"
              onClick={() => setSelectMerchantList(true)}
            >
              <img src={addPlusIcon} width={22} height={22} alt="" />
              Add more
            </div>
          </div>
          <div className="fs-16 fw-500 mb-10">Merchant Radius</div>
          <div className="d-flex flex-wrap mb-12 align-center gap-16">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => setSelected(option)}
                className={`merchantMiles fs-16 fw-500 cursor-pointer
              ${selected === option ? "selectedMiles" : ""}
            `}
              >
                {selected === option && (
                  <img src={merchantMilesSelected} alt="" />
                )}
                <span className={selected === option ? "pl-5" : ""}>
                  {option} {option === "National" ? "" : "miles"}
                </span>
              </div>
            ))}
          </div>
          <div className="fs-12 grey">
            Selected merchants will target users within{" "}
            {selected === "National"
              ? "the entire country"
              : `${selected} miles`}
            .
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-24 fw-600">Enter the Recipe Details</div>
          <div className="divider2"></div>
          <div className="">
            <div className="mb-20">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Required ingredients
              </label>
              <textarea placeholder="Required ingredients"></textarea>
            </div>
          </div>
          <div className="">
            <div className="">
              <label htmlFor="name" className=" mb-10 fs-16 fw-500">
                Preparation instructions
              </label>
              <textarea placeholder="Preparation instructions"></textarea>
            </div>
          </div>
        </div>
        <div className="tabPadding mb-20">
          <div className="fs-24 fw-600">Supplier/Distributor Links</div>
          <div className="divider2"></div>
          <div className="inputGrid gap-20">
            <div className="">
              <label className=" mb-10 fs-16 fw-500">Food Ordering</label>
              <input
                type="text"
                className="input"
                placeholder="Link to the Supplier/Distributor that provides the food ingredients"
              />
            </div>
            <div className="">
              <label className=" mb-10 fs-16 fw-500">Beverage Ordering</label>
              <input
                type="text"
                className="input"
                placeholder="Link to the Supplier/Distributor that provides the beverage"
              />
            </div>
          </div>
        </div>
        <div className="tabPadding mb-40">
          <div className="fs-24 fw-600">Preview</div>
          <div className="divider2"></div>
          <div className="d-flex gap-20">
            <div
              className="text-center PreviewideoThumbnail"
              onClick={() => setActiveVideoUrl(embeddedUrl)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <img
                src={playbtn}
                className="playbtn"
                alt="Play"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="w-100 h-100"
              />
            </div>
            <div>
              <div className="fs-20 fw-600">Savvy nudge</div>
              <div className="fs-16">
                Free drink on Happy Hours! From 07:00 PM to 08:00 PM
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-end">
          <div className="btn p32">Publish Savvy Nudge</div>
        </div>
      </div>
      <Modal
        open={!!activeVideoUrl}
        onCancel={() => setActiveVideoUrl(null)}
        footer={null}
        centered
        destroyOnClose
        className="videoModal"
      >
        {activeVideoUrl && (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`${activeVideoUrl}?autoplay=1`}
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
      <Modal
        centered
        visible={selectMerchantList} // Control the visibility of the modal  // Handle close
        footer={null} // Hide the footer (buttons)
        // closable={false}
        className="selecModalFollowerList"
        onOk={() => setSelectMerchantList(false)}
        onCancel={() => setSelectMerchantList(false)}
      >
        <div className=" d-flex justify-between align-center">
          <div className="fs-24 fw-600">Create Group</div>
          <div
            className="closeSidebar"
            onClick={() => setSelectMerchantList(false)}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className=" d-flex serchSelectall align-center gap-20 mb-20">
          <SearchSelect />
          <div className="fs-16 fw-600 pc wordWrapNone cursor-pointer">
            Select All
          </div>
        </div>
        <div className="addMerchantGrid gap-20 mb-20">
          <label class="custom-label w-100">
            <input autocomplete="off" type="radio" name="option" />
            <div class="custom-radio-button">
              <img alt="radioSelected" src="/assets/images/radioSelected.svg" />
            </div>
            <div class="radioImage">
              <img alt="" src="/assets/images/noImageFound.png" />
            </div>
            <div class="radioCafeName">
              <div>
                <div class="pc fs-14 fw-500 oneLine">Hotel dell</div>
                <div class="fs-12 oneLine">
                  {" "}
                  New York New York 10036 United States
                </div>
              </div>
            </div>
          </label>
          <label class="custom-label w-100">
            <input autocomplete="off" type="radio" name="option" />
            <div class="custom-radio-button">
              <img alt="radioSelected" src="/assets/images/radioSelected.svg" />
            </div>
            <div class="radioImage">
              <img alt="" src="/assets/images/noImageFound.png" />
            </div>
            <div class="radioCafeName">
              <div>
                <div class="pc fs-14 fw-500 oneLine">Hotel dell</div>
                <div class="fs-12 oneLine">
                  {" "}
                  New York New York 10036 United States
                </div>
              </div>
            </div>
          </label>
          <label class="custom-label w-100">
            <input autocomplete="off" type="radio" name="option" />
            <div class="custom-radio-button">
              <img alt="radioSelected" src="/assets/images/radioSelected.svg" />
            </div>
            <div class="radioImage">
              <img alt="" src="/assets/images/noImageFound.png" />
            </div>
            <div class="radioCafeName">
              <div>
                <div class="pc fs-14 fw-500 oneLine">Hotel dell</div>
                <div class="fs-12 oneLine">
                  {" "}
                  New York New York 10036 United States
                </div>
              </div>
            </div>
          </label>
          <label class="custom-label w-100">
            <input autocomplete="off" type="radio" name="option" />
            <div class="custom-radio-button">
              <img alt="radioSelected" src="/assets/images/radioSelected.svg" />
            </div>
            <div class="radioImage">
              <img alt="" src="/assets/images/noImageFound.png" />
            </div>
            <div class="radioCafeName">
              <div>
                <div class="pc fs-14 fw-500 oneLine">Hotel dell</div>
                <div class="fs-12 oneLine">
                  {" "}
                  New York New York 10036 United States
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="pc text-center cursor-pointer">View More</div>
        <div className="divider2"></div>
        <div className="d-flex justify-end">
          <div className="btn p32">Add</div>
        </div>
      </Modal>
     
    </>
  );
};

export default CreateSavvyNudge;
