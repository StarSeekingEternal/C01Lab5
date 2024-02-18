const SERVER_URL = "http://localhost:4000";

afterEach(async () => {
    await fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
});

test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const postNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {method: "GET"});
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    let title = "T1";
    let  content = "C1";
  
    let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    title = "T2";
    content = "C2";
  
    postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    
    postNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {method: "GET"});
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toHaveLength(2);
    expect(postNoteBody.response[0].title).toBe("T1");
    expect(postNoteBody.response[0].content).toBe("C1");
    expect(postNoteBody.response[1].title).toBe("T2");
    expect(postNoteBody.response[1].content).toBe("C2");
  });

test("/deleteNote - Delete a note", async () => {
    let title = "T1";
    let  content = "C1";
  
    let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    let postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    postNoteRes = await fetch(`${SERVER_URL}/deleteNote/${id}`, {method: "DELETE"});
    postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe(`Document with ID ${id} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  let postNoteBody = await postNoteRes.json();
  let id = postNoteBody.insertedId;

  title = "NewTitle";
  content = "NewContent";
  postNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe(`Document with ID ${id} patched.` );
});

test("/patchNote - Patch with just title", async () => {
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  let postNoteBody = await postNoteRes.json();
  let id = postNoteBody.insertedId;

  title = "NewTitle";
  postNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe(`Document with ID ${id} patched.` );
});

test("/patchNote - Patch with just title", async () => {
  let title = "NoteTitleTest";
  let content = "NoteTitleContent";

  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  let postNoteBody = await postNoteRes.json();
  let id = postNoteBody.insertedId;

  content = "NewContent";
  postNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content
    }),
  });

  postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe(`Document with ID ${id} patched.` );
});

test("/deleteAllNotes - Delete one note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
  const resConverted = await res.json();
  expect(res.status).toBe(200);
  expect(resConverted.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  let title = "T1";
  let  content = "C1";

  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  title = "T2";
  content = "C2";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  title = "T3";
  content = "C3";

  postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const res = await fetch(`${SERVER_URL}/deleteAllNotes`, {method: "DELETE"});
  const resConverted = await res.json();
  expect(res.status).toBe(200);
  expect(resConverted.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  let title = "T1";
  let  content = "C1";

  let postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  //let id = await postNoteRes.json().insertedId;
  let postNoteBody = await postNoteRes.json();
  let id = postNoteBody.insertedId;
  postNoteRes = await fetch(`${SERVER_URL}/updateNoteColor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({color: "#FF0000"}),
  });
  const resConverted = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(resConverted.message).toBe(`Note color updated successfully.`);
});