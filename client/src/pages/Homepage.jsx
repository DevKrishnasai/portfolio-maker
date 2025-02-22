import {
  Alert,
  Box,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemainingDetailsPage from "./RemainingDetailsPage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase files/firebase";
import styled from "styled-components";
import HomePart1 from "./HomePart1";
import Account from "../components/Account";
import { Edit, Logout, Person, Settings } from "@mui/icons-material";

const Homepage = ({ user, setUser }) => {
  //useState hooks to handle state changes
  const [page, setPage] = useState("home");
  const [hide, setHide] = useState(false);
  const [counter, setCounter] = useState(1);
  const [tagsController, setTagsController] = useState("");
  const [techsController, setTechsController] = useState("");
  const [toolsController, setToolsController] = useState("");

  //These are used to control project section
  const [projectsController, setProjectsController] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    github_live_link: "",
    github_repo_link: "",
    tech_stack: [],
    image_url: "",
  });

  //main data
  const [data, setData] = useState({
    logoName: "",
    fullName: "",
    email: "",
    about: "",
    tags: [],
    techs: [],
    tools: [],
    projects: [],
    links: {
      github: "",
      linkedin: "",
      instagram: "",
    },
    portfolioId: user["portfolioId"],
    hero_url: "",
    resume_url: "",
  });

  //styles
  const textBoxSX = {
    marginY: "10px",
  };

  //data deletions and adding functions
  const deleteLines = (key, str, other = false) => {
    if (other) {
      handleClickDelete();
      const tempData = project[str].filter((doc) => doc["key"] !== key);
      setProject({ ...project, [str]: tempData });
    } else {
      handleClickDelete();
      const tempData = data[str].filter((doc) => doc["key"] !== key);
      setData({ ...data, [str]: tempData });
    }
  };

  const addLines = (e, str, controller, other = false) => {
    if (e.key === "Enter" && controller !== "") {
      if (other) {
        handleClickAdd();
        const sample = [...project[str], { key: counter, value: controller }];
        const x = { ...project, [str]: sample };
        setProject(x);
        setCounter(counter + 1);
        setProjectsController("");
      } else {
        handleClickAdd();
        const sample = [...data[str], { key: counter, value: controller }];
        const x = { ...data, [str]: sample };
        setData(x);
        setTagsController("");
        setTechsController("");
        setToolsController("");
        setCounter(counter + 1);
      }
      setError("");
    }
  };

  //project adding function
  const addProject = () => {
    let temp = [...data["projects"], project];

    setData({ ...data, projects: temp });
    setProjectsController([]);
    handleClickAdd();
  };

  const deleteProject = (title) => {
    let temp = data["projects"].filter((doc) => doc["title"] !== title);
    setData({ ...data, projects: temp });
    setProjectsController([]);
    handleClickDelete();
  };

  //snackbar stuff
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleClickAdd = () => {
    setAdd(true);
  };
  const handleClickDelete = () => {
    setRemove(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAdd(false);
    setRemove(false);
  };

  const [error, setError] = useState(false);
  const checkForm = async () => {
    if (data["logoName"] === "") {
      setError("logoName");
    } else if (data["fullName"] === "") {
      setError("fullName");
    } else if (data["email"] === "" || !data["email"].includes("@")) {
      setError("email");
    } else if (data["tags"].length === 0) {
      setError("tags");
    } else if (data["about"] === "") {
      setError("about");
    } else if (data["techs"].length === 0) {
      setError("techs");
    } else if (data["tools"].length === 0) {
      setError("tools");
    } else if (data["resume_url"] === "") {
      setError("resume_url");
    } else if (data["links"]["github"] === "") {
      setError("github");
    } else if (data["links"]["linkedin"] === "") {
      setError("linkedin");
    } else if (data["links"]["instagram"] === "") {
      setError("instagram");
    } else if (data["hero_url"] === "") {
      setError("hero_url");
    } else {
      setError("");
      setPage("middle");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [loading, setLoading] = useState(false);

  const uploadImage = (file) => {
    setError(false);
    setLoading(true);
    if (file == null) return;
    const imageRef = ref(storage, `${data["fullName"]}/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, hero_url: url });
        setLoading(false);
      });
    });
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getUserByData = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND_URL}/portfolios/updateData/${user["portfolioId"]}`
        );
        const data = await response.json();

        if (data["status"] === 200) {
          setData({ ...data["portfolio"] });
        } else {
          setData({
            logoName: "",
            fullName: "",
            email: user["email"],
            about: `I'm <i>${user["name"]}</i> and I'm a <b>software developer</b> <br> I'm passionate about <b>web development</b> and <b>machine learning</b>`,
            tags: [],
            techs: [],
            tools: [],
            projects: [],
            links: {
              github: "",
              linkedin: "",
              instagram: "",
            },
            portfolioId: user["portfolioId"],
            hero_url: "",
            resume_url: "",
          });
        }

        // setLoading(false);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    getUserByData();
    // setLoading(true);
  }, [user, open]);

  //dilog boxes

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (id) => {
    try {
      fetch(`${process.env.REACT_APP_API_BACKEND_URL}/users/updateUser`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...user, updatedPortfolioId: id }),
      })
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          if (d.status === 200) {
            setError(false);
            handleClickClose();
            setUser({ ...user, portfolioId: d["_doc"]["portfolioId"] });
            setData({ ...data, portfolioId: d["_doc"]["portfolioId"] });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //main code
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* {page === "home" && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Hi {user["email"].split("@")[0]}, Welcome to your portfolio</h2>
          <span>
            You can start by filling in the details below. Click on the settings
            icon to update your account details or logout
          </span>
        </div>
      )} */}
      {page === "home" && (
        <HomePart1
          data={data}
          setData={setData}
          error={error}
          setError={setError}
          textBoxSX={textBoxSX}
          setTagsController={setTagsController}
          tagsController={tagsController}
          addLines={addLines}
          deleteLines={deleteLines}
          setTechsController={setTechsController}
          techsController={techsController}
          setToolsController={setToolsController}
          toolsController={toolsController}
          VisuallyHiddenInput={VisuallyHiddenInput}
          checkForm={checkForm}
          uploadImage={uploadImage}
          loading={loading}
        />
      )}
      {page === "middle" && (
        <RemainingDetailsPage
          setProject={setProject}
          project={project}
          addLines={addLines}
          deleteLines={deleteLines}
          projectsController={projectsController}
          setProjectsController={setProjectsController}
          addProject={addProject}
          deleteProject={deleteProject}
          data={data}
          handleClickAdd={handleClickAdd}
          handleClickDelete={handleClickDelete}
          user={user}
          hide={hide}
          setHide={setHide}
        />
      )}
      <Snackbar
        open={add}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: "40px",
          }}
          color="success"
          variant="filled"
        >
          Added
        </Alert>
      </Snackbar>
      <Snackbar
        open={remove}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          // severity="success"
          sx={{
            width: "100%",
            backgroundColor: "red",
            borderRadius: "40px",
          }}
          color="error"
          variant="filled"
        >
          Deleted
        </Alert>
      </Snackbar>
      <Account
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        open={open}
        setOpen={setOpen}
        user={user}
        setUser={setUser}
        handleUpdate={handleUpdate}
      />
      {!hide && (
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: "fixed", top: 10, right: 10 }}
          icon={<Settings openIcon={<Edit />} />}
          direction="down"
        >
          <SpeedDialAction
            key="account"
            icon={<Person />}
            tooltipTitle="account"
            onClick={handleClickOpen}
          />
          <SpeedDialAction
            key="logout"
            icon={<Logout />}
            tooltipTitle="logout"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          />
        </SpeedDial>
      )}
    </Box>
  );
};

export default Homepage;
